import React, { useState } from 'react';

import { Box, Button, Container, Paper, Typography } from '@mui/material';

import { EditActivityModal } from './modals';
import AddActivity from './modals/AddActivity';

import { UserWrapper } from '~/components';
import { IActivity } from '~/data';
import { collections, useListen } from '~/utils';

const Forms = () => {
  const { docs: activities, isLoading: activitiesLoading } =
    useListen<IActivity>({
      collectionRef: collections.activities.ref,
    });

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >(undefined);

  const handleOpenEditActivityModal = ({
    activity,
  }: {
    activity: IActivity;
  }) => {
    setSelectedActivity(activity);
    setOpenEditModal(true);
  };
  const handleCloseEditActivityModal = () => setOpenEditModal(false);

  if (activitiesLoading) return <div>Loading...</div>;

  return (
    <>
      <UserWrapper />
      <Container>
        <Typography variant='h4' gutterBottom>
          Activities
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button variant='contained' onClick={handleOpenAddModal}>
            Add Activity
          </Button>
        </Box>
        <Paper
          sx={{
            backgroundColor: '#f9efca',
            p: 3,
            color: '#06495A',
            fontWeight: '700',
          }}
        >
          {!!activities && activities.length ? (
            activities?.map((activity) => (
              <Paper
                key={activity.id}
                onClick={() => handleOpenEditActivityModal({ activity })}
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
              >
                <Typography
                  variant='h5'
                  sx={{ color: '#06495A', fontWeight: '700' }}
                >
                  {activity?.title || 'No title available'}
                </Typography>
                <Typography variant='body1'>
                  {activity?.description || ''}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography>No activities found</Typography>
          )}
        </Paper>

        {selectedActivity && (
          <EditActivityModal
            selectedActivity={selectedActivity}
            onClose={handleCloseEditActivityModal}
            open={openEditModal}
          />
        )}

        {openAddModal && (
          <AddActivity onClose={handleCloseAddModal} open={openAddModal} />
        )}
      </Container>
    </>
  );
};

export default Forms;
