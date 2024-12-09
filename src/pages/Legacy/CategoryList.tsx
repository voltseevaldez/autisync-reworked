import { useState } from 'react';

import '../../styles/CategoryList.css';
import TextField from '@mui/material/TextField';
import { Divider } from 'antd';
import { doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { UserWrapper } from '~/components';
import { IRoom, categories } from '~/data';
import {
  SetDocument,
  collections,
  createHashMap,
  database,
  useErrorNotif,
  useListen,
  useLogin,
} from '~/utils';

/**
 * Integrations
 * -------------
 * - `categories`
 */
const CategoryList = () => {
  const showError = useErrorNotif();
  const { docs: rooms, isLoading } = useListen<IRoom>({
    collectionRef: collections.rooms.ref,
  });

  const { user } = useLogin();

  const navigate = useNavigate();
  // for Profile logo modal //
  const [roomNumber, setRoomNumber] = useState(''); // State for controlled input
  const [isSubmitting, setIsSubmitting] = useState(false); // State for controlled input
  const handleRoomNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRoomNumber(event.target.value);
  };
  const roomsMap = createHashMap(rooms || [], 'roomNumber');

  // for join now modal //
  const [Join, setJoin] = useState(false);

  const openJoin = () => setJoin(true);
  const closeJoin = () => setJoin(false);

  const handleJoinRoom = async () => {
    try {
      setIsSubmitting(true);
      // TODO: Implement join room logic
      const selectedRoom = roomsMap?.get(roomNumber);

      const membersSet = new Set<string>(selectedRoom?.members || []);
      membersSet.add(user?.uid || '');

      if (!!selectedRoom) {
        await SetDocument<IRoom>({
          docRef: doc(
            database,
            collections.rooms.string + '/' + selectedRoom.id
          ),
          data: {
            ...selectedRoom,
            members: Array.from(membersSet),
          },
        });

        navigate(`/room/${selectedRoom.id}`);
      } else {
        showError('Room not found');
        closeJoin();
      }
    } catch (error) {
      console.error(error);
      showError(error);
    } finally {
      setIsSubmitting(false);
      closeJoin();
    }
  };

  if (isLoading) return <>...Loading</>;

  return (
    <>
      <UserWrapper />
      {/* Join now Modal*/}
      {Join && (
        <div className='join-overlay' onClick={closeJoin}>
          <div className='join-content' onClick={(e) => e.stopPropagation()}>
            <p className='join-friend'>JOIN A FRIEND </p>
            <TextField
              hiddenLabel
              id='filled-hidden-label-normal'
              placeholder='Enter Room Number to Join a Friend'
              variant='filled'
              value={roomNumber}
              onChange={handleRoomNumberChange}
              sx={{
                marginBottom: '20px',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'white', // Input background color
                  fontFamily: 'Poppins',
                  border: '1px solid black', // Custom border color
                  borderRadius: '20px', // Custom border radius
                  boxShadow: 'none', // Remove box-shadow
                  width: '500px',
                  '&:hover': {
                    borderColor: 'black', // Change border color on hover
                    backgroundColor: 'white', // Change background color on hover
                  },
                  '&:before, &:after': {
                    content: 'none', // Fully removes the underline
                  },
                  '&.Mui-focused': {
                    borderColor: 'black', // Border color when focused
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

            <div className='join-butt-container'>
              <button
                className='join-button'
                onClick={handleJoinRoom}
                disabled={isSubmitting}
              >
                JOIN
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='category-parent'>
        <div className='header-content'>
          <div className='header-text'>
            <p className='category-text'>Choose Category</p>
          </div>

          <div className='button-container'>
            <button className='JoinButton' onClick={openJoin}>
              JOIN A FRIEND!
            </button>
          </div>
        </div>
      </div>

      <div className='divider2-container'>
        <div className='divider_2'>
          <Divider style={{ borderColor: '#06325A', borderWidth: '3px' }} />
        </div>
      </div>

      <div className='category-content-container'>
        <div className='contents-for-container'>
          {categories.map(({ imageLink, name, link }, idx) => (
            <img
              key={idx}
              src={imageLink}
              alt={name}
              className='category-image'
              onClick={() => navigate(link)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
