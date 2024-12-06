import '../../styles/AcademicActivityChat.css';
import { FC, useRef, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { Divider } from 'antd';
import { format } from 'date-fns';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

import { UserWrapper } from '~/components';
import { IActivity, IBadge, IRoom } from '~/data';
import { IUser } from '~/types';
import {
  SetDocument,
  collections,
  createHashMap,
  database,
  useErrorNotif,
  useListen,
  useLogin,
} from '~/utils';

const Activity = () => {
  const { activityId, roomId } = useParams();
  const navigate = useNavigate();

  const { docs: rooms, isLoading: isRoomFetching } = useListen<IRoom>({
    collectionRef: collections.rooms.ref,
    filters: [{ key: 'id', value: (roomId || '') as any }],
  });

  const { docs, isLoading } = useListen<IActivity>({
    collectionRef: collections.activities.ref,
    filters: [{ key: 'id', value: (activityId || '') as any }],
  });

  if (isLoading || isRoomFetching) {
    return <div>Loading...</div>;
  }

  if (!docs || docs.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Activity Not Found
        </Typography>
        <Typography variant='body1' gutterBottom>
          The activity you are looking for does not exist or has been removed.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/legacy/home2')}
          sx={{ mt: 2 }}
        >
          Go Back to Home
        </Button>
      </Box>
    );
  }
  const room = (rooms || [])[0] || {};

  return (
    <>
      {!!docs && docs.length > 0 && (
        <MainComponent activity={docs[0]} room={room} />
      )}
    </>
  );
};

const FinishedActivity: FC<{
  score: number;
  totalItems: number;
  room: IRoom;
  activity: IActivity;
}> = ({ score, totalItems, room, activity }) => {
  const navigate = useNavigate();
  const showError = useErrorNotif();

  const { user } = useLogin();

  const [showBadgePopup, setShowBadgePopup] = useState(false);

  const [updatedBadges, setUpdatedBadges] = useState<IBadge[]>([]);

  const handleFinishActivity = async () => {
    try {
      if (!!user) {
        const docRef = doc(
          database,
          collections.users.string + '/' + user?.uid
        );
        const existingUserData = await getDoc(docRef);
        const existingBadges = existingUserData.data()?.badges || [];
        const newBadges = activity?.badges || [];

        // Find the badges earned from this activity
        const badgesEarnedFromActivity = newBadges.filter(
          (badge) =>
            !existingBadges.some(
              (existingBadge: any) =>
                existingBadge.description === badge.description
            )
        );

        if (badgesEarnedFromActivity.length > 0) {
          setUpdatedBadges(badgesEarnedFromActivity);
          setShowBadgePopup(true);
        }

        // Update user document with new badges and progress
        await SetDocument<IUser>({
          docRef,
          data: {
            ...existingUserData.data(),
            progress: [
              ...(existingUserData.data()?.progress || []),
              {
                activityId: room.activity,
                score: score,
                total: totalItems,
                date: new Date().toISOString(),
                time: format(new Date(), 'p, MMM dd'),
                room: room.id,
              },
            ],
            badges: [
              ...(existingUserData.data()?.badges || []),
              ...badgesEarnedFromActivity,
            ],
          },
        });
      }

      setTimeout(() => {
        navigate('/legacy/home2');
      }, 3000);
    } catch (err) {
      console.error(err);
      showError("Couldn't finish activity. Please try again later.");
    }
  };

  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'}>
      <Paper
        sx={{
          p: 3,
          width: '800px',
          backgroundColor: '#FFC700',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack spacing={2} alignItems='center' justifyContent='center'>
          <Typography variant='h3'>Activity Completed</Typography>
          <Typography variant='h4'>
            Score: <strong>{score}</strong>/<strong>{totalItems}</strong>
          </Typography>
          <Box>
            <Button variant='contained' onClick={handleFinishActivity}>
              Finish
            </Button>
          </Box>
        </Stack>
      </Paper>

      {showBadgePopup && (
        <div className='badge-popup'>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                maxWidth: '500px',
                width: '90%',
                backgroundColor: '#ffffff',
                borderRadius: '15px',
              }}
            >
              <Typography variant='h4'>
                Congratulations! You Earned New Badges!
              </Typography>
              <ul>
                {updatedBadges.map((badge, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center justify-center'
                  >
                    <img src={badge.imageLink} />
                    <li key={index}>{badge.description}</li>
                  </div>
                ))}
              </ul>
            </Paper>
          </Box>
        </div>
      )}
    </Box>
  );
};

const MainComponent: FC<{ activity: IActivity; room: IRoom | undefined }> = ({
  activity,
  room,
}) => {
  const [score, setScore] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);

  const [openAnswerModal, setAnswerOpenModal] = useState(false);
  const handleOpenAnswerModal = () => setAnswerOpenModal(true);
  const handleCloseAnswerModal = () => setAnswerOpenModal(false);

  const totalSteps = activity.questions.length || 0;
  const [activeStep, setActiveStep] = useState(1);
  const handleNextStep = () => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setIsCorrect(false);
    }
    setActiveStep((prev) => (prev < totalSteps + 2 ? prev + 1 : prev));
  };

  const { user: currentUser } = useLogin();
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleChatInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChatInput(event.target.value);
  };

  const { docs: users } = useListen<IUser>({
    collectionRef: collections.users.ref,
  });

  const userMap = createHashMap(users || [], 'id');

  const handleChat = async () => {
    if (isSending) return; // Prevent double sending

    setIsSending(true); // Set sending status to true
    try {
      if (room) {
        const roomRef = doc(database, collections.rooms.string + '/' + room.id);
        await SetDocument<IRoom>({
          docRef: roomRef,
          data: {
            ...room,
            chat: [
              ...room.chat,
              {
                user: currentUser?.uid || '',
                message: chatInput,
                createdAt: new Date().toISOString(),
              },
            ],
          },
        });
      }

      setChatInput('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false); // Reset sending status
    }
  };

  const setChatContainerRef = (element: HTMLDivElement) => {
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
    (chatContainerRef as any).current = element;
  };

  return (
    <>
      <UserWrapper />

      <div className='academic-activity1-header'>
        <h1 className='AA1-Text'>
          {activity.category && typeof activity.category === 'string'
            ? activity.category.toUpperCase()
            : 'Unknown'}
        </h1>
        <img
          src='/assets/images/horn.png'
          alt='Horn Logo'
          className='horn-logo'
        />
      </div>

      <div className='divider7-container'>
        <div className='divider_7'>
          <Divider style={{ borderColor: '#F9EFCA', borderWidth: '3px' }} />
        </div>
      </div>

      {activeStep <= totalSteps && (
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {activity.questions.map((_, idx) => (
            <Step key={idx} active={idx + 1 == activeStep}>
              <StepLabel>Question {idx + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      {activeStep < totalSteps + 1 ? (
        <div
          className='activity-container relative'
          style={{ marginBottom: '2rem' }}
        >
          <div className='activity1-card'>
            <div className='question'>
              <p className='question1-text'>
                {activity.questions[activeStep - 1]?.question ||
                  'Question not available'}
              </p>
            </div>
            <div className='image1-container'>
              <div className='image-item1'>
                <img
                  className='sheep1'
                  src={activity.questions[activeStep - 1]?.imageLink || ''}
                  alt='image'
                />
              </div>
            </div>

            <div className='answer-choice-container'>
              <div className='answer-choice-header'>
                <p className='answer-header-text'>Choose your answer:</p>
              </div>
            </div>

            <div className='answers-container'>
              {activity.questions[activeStep - 1].choices.map(
                ({ choice, isCorrect }, idx) => (
                  <div className='choice1' key={idx}>
                    <button
                      className='choice1-button'
                      onClick={() => {
                        setIsCorrect(isCorrect);
                        handleOpenAnswerModal();
                      }}
                    >
                      {choice || 'Not Available'}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {room && room?.members.length > 1 && (
            <div className='w-auto first-letter hidden md:block bg-[#f9f4e1] rounded-lg shadow-md h-[500px] absolute right-[1%]'>
              {room && room?.members.length > 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    px: 1,
                  }}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      overflowY: 'auto',
                      minHeight: '23rem',
                      height: '100%',
                      boxSizing: 'object-fit',
                      pt: 2,
                    }}
                    ref={setChatContainerRef}
                  >
                    {room?.chat.map(({ message, user, createdAt }, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          flexDirection:
                            user === currentUser?.uid ? 'row-reverse' : 'row',
                          alignItems: 'center',
                          mb: 2,
                          position: 'relative',
                        }}
                      >
                        <h1 className='absolute text-xs top-[-14%]'>
                          {userMap?.get(user)?.firstName || 'User'}
                        </h1>
                        <Avatar
                          alt={userMap?.get(user)?.firstName || 'User'}
                          src={`/path/to/profile/icons/${user}.png`}
                          sx={{
                            width: 32,
                            height: 32,
                            mr: user === currentUser?.uid ? 0 : 2,
                            ml: user === currentUser?.uid ? 2 : 0,
                          }}
                        />
                        <Box
                          sx={{
                            backgroundColor:
                              user === currentUser?.uid ? '#DCF8C6' : '#FFF',
                            borderRadius: 2,
                            p: 1,
                            marginTop: 1,
                            maxWidth: '70%',
                            boxShadow: 1,
                          }}
                        >
                          <Typography
                            variant='body2'
                            sx={{ wordWrap: 'break-word' }}
                          >
                            {message}
                          </Typography>
                          <Typography
                            variant='caption'
                            color='textSecondary'
                            sx={{
                              display: 'block',
                              textAlign: 'right',
                              mt: 0.5,
                            }}
                          >
                            {format(new Date(createdAt), 'p, MMM dd')}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center !important',
                      minHeight: '5rem',
                      width: '100%',
                    }}
                  >
                    <TextField
                      hiddenLabel
                      id='filled-hidden-label-normal'
                      placeholder='Chat here'
                      value={chatInput}
                      onChange={handleChatInputChange}
                      variant='filled'
                      fullWidth
                      sx={{
                        '& .MuiFilledInput-root': {
                          backgroundColor: 'white', // Input background color
                          fontFamily: 'Poppins',
                          borderRadius: '20px', // Custom border radius
                          boxShadow: 'none', // Remove box-shadow
                          '&:hover': {
                            backgroundColor: 'white', // Change background color on hover
                          },
                          '&:before, &:after': {
                            content: 'none', // Fully removes the underline
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'white', // Background color when focused
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: '#8F9394', // Input text color
                        },
                        '& .MuiInputLabel-root': {
                          color: '#375A63', // Label color
                        },
                      }}
                    />
                    <IconButton
                      color='primary'
                      onClick={handleChat}
                      sx={{ ml: 1 }}
                      disabled={chatInput === '' || isSending} // Disable button if input is empty or sending
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          {!!room && activity && (
            <FinishedActivity
              score={score}
              totalItems={totalSteps}
              room={room}
              activity={activity}
            />
          )}
        </>
      )}

      {openAnswerModal && (
        <div className='modal1-overlay' onClick={handleCloseAnswerModal}>
          <div className='modal1-content' onClick={(e) => e.stopPropagation()}>
            <div className='activity1-card1'>
              <div
                className={
                  isCorrect ? 'check-logo-container' : 'wrong-logo-container'
                }
              >
                {isCorrect ? (
                  <img
                    className='check-logo'
                    src='/assets/images/check.png'
                    alt='Check Logo'
                  />
                ) : (
                  <img
                    className='wrong-logo'
                    src='/assets/images/wrong.png'
                    alt='Wrong Logo'
                  />
                )}
              </div>

              <div
                className={isCorrect ? 'correct-message1' : 'wrong-message1'}
              >
                <p className={isCorrect ? 'correct-text1' : 'wrong-text1'}>
                  {isCorrect ? 'CORRECT' : 'Try Again'}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Button
                  variant='contained'
                  onClick={() => {
                    handleNextStep();
                    handleCloseAnswerModal();
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Activity;
