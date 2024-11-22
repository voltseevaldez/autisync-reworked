import { useState } from 'react';

import { Container, Paper, Typography } from '@mui/material';
import { Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import CreateRoomModal from './CreateRoom';

import { UserWrapper } from '~/components';
import { IActivity } from '~/data';
import { collections, useListen } from '~/utils';

const ChooseActivity = () => {
  const { category, difficulty } = useParams();

  const _navigate = useNavigate();

  const { docs, isLoading } = useListen<
    IActivity & { id: string; createdAt: string }
  >({
    collectionRef: collections.activities.ref,
    filters: [
      { key: 'category', value: category || '' },
      { key: 'difficulty', value: difficulty || '' },
    ],
  });

  // Modal Controls
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);

  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >(undefined);

  const handleActivitySelect = (activity: IActivity) => {
    setSelectedActivity(activity);
    setOpen(true);
  };
  // navigate(`/activity/${activityId}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserWrapper />
      <Container>
        <Typography
          variant='h5'
          sx={{ my: 3, fontWeight: '700', color: '#06495A' }}
        >
          Choose an Activity
        </Typography>
        <Divider style={{ borderColor: '#06325A', borderWidth: '3px' }} />
        <Paper
          sx={{
            backgroundColor: '#f9efca',
            p: 3,
            color: '#06495A',
            fontWeight: '700',
          }}
        >
          {!!docs && docs.length ? (
            docs?.map((doc) => (
              <Paper
                key={doc.id}
                sx={{
                  p: 2,
                  m: 2,
                  backgroundColor: '#FFC700',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'ease 0.2s',
                  },
                }}
                onClick={() => handleActivitySelect(doc)}
              >
                <Typography
                  variant='h5'
                  sx={{ color: '#06495A', fontWeight: '700' }}
                >
                  {doc?.title || 'No title available'}
                </Typography>
                <Typography variant='body1'>
                  {doc?.description || ''}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography>No activities found</Typography>
          )}
        </Paper>
        {selectedActivity && (
          <CreateRoomModal
            activity={selectedActivity}
            open={open}
            onClose={handleCloseModal}
          />
        )}
      </Container>

      {/* Modal */}
    </>
  );
};

export default ChooseActivity;
