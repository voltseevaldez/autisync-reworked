import { FC } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IActivity, IRoom } from '~/data';
import { AddDocument, collections, useErrorNotif, useLogin } from '~/utils';

const generateRandomString = (length = 5): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const CreateRoomModal: FC<
  DialogProps & {
    onClose: () => void;
    activity: IActivity;
  }
> = ({ onClose, open, activity, ...rest }) => {
  const { user } = useLogin();
  const showError = useErrorNotif();
  const navigate = useNavigate();
  const handleCreateRoom = async () => {
    try {
      const roomNumber = generateRandomString();
      const docRef = await AddDocument<IRoom>({
        collectionRef: collections.rooms.ref,
        data: {
          active: true,
          activity: activity?.id,
          status: 'waiting',
          chat: [],
          members: [user?.uid || ''],
          roomNumber,
        },
      });

      navigate(`/room/${docRef.id}`);
      onClose();
    } catch (err) {
      showError(err);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      <DialogTitle>Create a Room</DialogTitle>
      <DialogContent>
        <Typography>Create a room to play with your friends</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={handleCreateRoom}>
          Create Room
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomModal;
