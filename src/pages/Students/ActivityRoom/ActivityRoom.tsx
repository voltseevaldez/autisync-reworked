import '~/styles/RoomCoop.css';

import { FC, useEffect, useRef, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Divider } from 'antd';
import { format } from 'date-fns';
import { doc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

import { UserWrapper } from '~/components';
import { IActivity, IRoom } from '~/data';
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

const RedirectComponent: FC<{ room: IRoom }> = ({ room }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const roomId = room?.id || '';
    if (room.status === 'playing') {
      navigate(`/activity/${room.activity}/${roomId}`);
    }
  }, [room.status, navigate, room.activity, room?.id]);

  return <></>;
};

const RoomCoop = () => {
  const { roomId } = useParams();
  const showError = useErrorNotif();
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false); // State to manage sending status
  const { user: currentUser } = useLogin();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { docs: rooms, isLoading: isFetchingRooms } = useListen<IRoom>({
    collectionRef: collections.rooms.ref,
    filters: [
      {
        key: 'id',
        value: roomId || '',
      },
    ],
  });
  const room = (rooms || [])[0] || {};

  const { docs: users, isLoading: isFetchingUsers } = useListen<IUser>({
    collectionRef: collections.users.ref,
  });

  const { docs: activities, isLoading: isFetchingActivities } =
    useListen<IActivity>({
      collectionRef: collections.activities.ref,
      filters: [], // Fetch all activities
    });

  if (isFetchingActivities || !activities || activities.length === 0)
    return <div>Loading activities...</div>;

  const activity = activities?.find((a) => a.id === room.activity);
  const category = activity?.category || 'Unknown';

  const userMap = createHashMap(users || [], 'id');

  if (isFetchingRooms || isFetchingUsers) return <>Loading...</>;

  const handleStartActivity = async () => {
    try {
      const roomRef = doc(database, collections.rooms.string + '/' + roomId);
      await SetDocument<IRoom>({
        docRef: roomRef,
        data: {
          ...room,
          status: 'playing',
          active: true,
        },
      });

      navigate(`/activity/${room.activity}/${roomId}`);
    } catch (err) {
      console.error(err);
      showError(err);
    }
  };

  const setChatContainerRef = (element: HTMLDivElement) => {
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
    (chatContainerRef as any).current = element;
  };

  const handleChat = async () => {
    if (isSending) return; // Prevent double sending

    setIsSending(true); // Set sending status to true
    try {
      const roomRef = doc(database, collections.rooms.string + '/' + roomId);
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

      setChatInput('');
    } catch (err) {
      console.error(err);
      showError(err);
    } finally {
      setIsSending(false); // Reset sending status
    }
  };

  const handleChatInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChatInput(event.target.value);
  };
  return (
    <>
      {/* NavBar */}
      <UserWrapper />
      {!!room && room.status === 'playing' ? (
        <RedirectComponent room={room} />
      ) : room && room.active ? (
        <div className='the-everything-container'>
          <div className='solo-lobby-container'>
            <div className='solo-lobby-header'>
              <img
                className='header-logo'
                src='/assets/images/academic-logo.png'
                alt='Academic Logo'
              ></img>
              <h1 className='room-header'>
                {category && typeof category === 'string'
                  ? category.toUpperCase()
                  : 'Unknown'}
              </h1>
            </div>
            <div className='room-header-end'>
              <p className='room-header-text'>
                INVITE FRIENDS BY TYPING THE ROOM NUMBER:
              </p>
            </div>
          </div>

          <div className='divider5-container'>
            <div className='divider_5'>
              <Divider style={{ borderColor: '#F7AF5A', borderWidth: '3px' }} />
            </div>
          </div>

          <div className='lobby-content-container'>
            <div className='solo-left-cont'>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  px: 2,
                }}
              >
                <Stack
                  spacing={2}
                  sx={{
                    overflowY: 'auto',
                    minHeight: '23rem',
                    boxSizing: 'object-fit',
                    pt: 2,
                  }}
                  ref={setChatContainerRef}
                >
                  {room.chat.map(({ message, user, createdAt }, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        flexDirection:
                          user === currentUser?.uid ? 'row-reverse' : 'row',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Avatar
                        alt={userMap?.get(user)?.firstName || 'User'}
                        src={`/path/to/profile/icons/${user}.png`} // Replace with actual path to profile icons
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
                          sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
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
                        // width: '340px', // Adjusted width to accommodate the button
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
            </div>

            <div className='solo-right-cont'>
              <div className='room-code'>Room Number: {room.roomNumber}</div>
              <div className='list-people-header'>
                <p className='people-list'>People:</p>
              </div>
              <div className='list-people2'>
                {!!room.members.length
                  ? (room.members || []).map((userId, idx) => (
                      // eslint-disable-next-line
                      <div
                        key={idx}
                        className='player1'
                        style={{ paddingLeft: '0.5rem' }}
                      >
                        <div className='player-img'>
                          <img
                            src='/assets/images/profile.png'
                            className='player-logo'
                          />
                        </div>
                        <div className='player-name'>{`${
                          userMap?.get(userId || '')?.firstName
                        } ${userMap?.get(userId || '')?.lastName}`}</div>
                      </div>
                    ))
                  : 'Only you'}
              </div>

              <div className='divider_6'>
                <Divider
                  style={{ borderColor: '#06325A', borderWidth: '3px' }}
                />
              </div>

              <div className='lobby-start-button'>
                <button className='start1-button' onClick={handleStartActivity}>
                  START!
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
            This room is no longer active
          </Typography>
          <Typography variant='body1' gutterBottom>
            The room you are trying to access is no longer active. Please return
            to the home page or join another room.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/legacy/home2')}
            sx={{ mt: 2 }}
          >
            Go to Home
          </Button>
        </Box>
      )}
    </>
  );
};

export default RoomCoop;
