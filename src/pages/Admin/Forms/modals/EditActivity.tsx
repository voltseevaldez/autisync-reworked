import React, { FC } from 'react';

import AddIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  type DialogProps,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { Divider } from 'antd';
import { DocumentReference } from 'firebase/firestore';
import {
  Field,
  FieldArray,
  type FieldArrayRenderProps,
  Form,
  Formik,
} from 'formik';
import { TextField } from 'formik-mui';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import { IActivity, IQuestion } from '~/data';
import { SetDocument, collections, useErrorNotif } from '~/utils';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  difficulty: Yup.string()
    .oneOf(['easy', 'medium', 'hard'])
    .required('Difficulty is required'),
  category: Yup.string().required('Category is required'),
  badges: Yup.array().of(
    Yup.object().shape({
      imageLink: Yup.string().required('Image link is required'),
      description: Yup.string().required('Description is required'),
    })
  ),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        imageLink: Yup.string().required('Image link is required'),
        question: Yup.string().required('Question is required'),
        choices: Yup.array()
          .of(
            Yup.object().shape({
              choice: Yup.string().required('Choice is required'),
              isCorrect: Yup.boolean().required('Correctness is required'),
            })
          )
          .min(2, 'At least two choices are required')
          .max(4, 'Maximum of 4 choices are allowed'),
      })
    )
    .min(1, 'At least one question is required'),
});

const EditActivity: FC<
  DialogProps & { onClose: () => void; selectedActivity: IActivity }
> = ({ onClose, open, selectedActivity, ...props }) => {
  const showError = useErrorNotif();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values: IActivity) => {
    try {
      const { doc, ...data } = values as IActivity & {
        doc: DocumentReference;
      };
      // eslint-disable-next-line no-console
      console.log(collections.activities.string + '/' + doc.id);

      await SetDocument<IActivity>({
        data,
        docRef: collections.activities.string + '/' + doc.id,
      });
      enqueueSnackbar('Activity Updated', { variant: 'success' });
      onClose();
    } catch (error) {
      console.error(error);
      showError(error);
    }
  };

  return (
    <Dialog
      fullScreen
      onClose={onClose}
      open={open}
      {...props}
      sx={(theme) => ({
        '& .MuiDialog-paper': {
          backgroundColor: theme.palette.background.default,
        },
      })}
    >
      <AppBar
        position='static'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant='h4' sx={{ mb: 3, m: 0 }}>
          Edit Activity
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Formik
          initialValues={selectedActivity}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }: any) => (
            <Form>
              <Typography variant='h4'>Activity Details</Typography>
              <Typography sx={{ mb: 3 }}>
                Edit the activity details below
              </Typography>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Field
                    component={TextField}
                    name='title'
                    label='Title'
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Field
                    component={TextField}
                    name='description'
                    label='Description'
                    fullWidth
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Field
                    component={TextField}
                    name='difficulty'
                    label='Difficulty'
                    select
                    fullWidth
                  >
                    <MenuItem value='easy'>Easy</MenuItem>
                    <MenuItem value='medium'>Medium</MenuItem>
                    <MenuItem value='hard'>Hard</MenuItem>
                  </Field>
                </Box>
                <Box>
                  <Field
                    component={TextField}
                    name='category'
                    label='Category'
                    select
                    fullWidth
                    required
                  >
                    <MenuItem value='academic'>Academic</MenuItem>
                    <MenuItem value='social'>Social</MenuItem>
                    <MenuItem value='objects'>Objects</MenuItem>
                  </Field>
                </Box>
              </Paper>

              <Divider />

              <Typography variant='h4' sx={{ mb: 3 }}>
                Badges
              </Typography>
              <Paper sx={{ p: 3, mb: 3 }}>
                <FieldArray name='badges'>
                  {({ push, remove }: FieldArrayRenderProps) => (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 3,
                        }}
                      >
                        <Button
                          variant='contained'
                          onClick={() =>
                            push({
                              imageLink: '',
                              description: '',
                            })
                          }
                          startIcon={<AddIcon />}
                        >
                          Add Badge
                        </Button>
                      </Box>

                      {!(values.badges || []).length && (
                        <Box sx={{ mb: 3 }}>
                          <Divider />
                          <Typography
                            variant='body1'
                            textAlign='center'
                            color='textSecondary'
                          >
                            No badges found
                          </Typography>
                        </Box>
                      )}

                      {(values.badges || []).map(
                        (_: any, badgesIdx: number) => (
                          <Box key={badgesIdx} sx={{ mb: 2 }}>
                            <Divider />
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={5}>
                                <Field
                                  component={TextField}
                                  name={`badges.${badgesIdx}.imageLink`}
                                  label={`Badge ${badgesIdx + 1} - Image Link`}
                                  fullWidth
                                  sx={{ mb: 1 }}
                                />
                              </Grid>
                              <Grid item xs={12} md={5}>
                                <Field
                                  component={TextField}
                                  name={`badges.${badgesIdx}.description`}
                                  label={`Badge ${badgesIdx + 1} - Description`}
                                  fullWidth
                                  sx={{ mb: 1 }}
                                />
                              </Grid>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <Button
                                  color='error'
                                  variant='outlined'
                                  onClick={() => remove(badgesIdx)}
                                  sx={{ ml: 2 }}
                                  endIcon={<DeleteIcon />}
                                >
                                  Remove Badge
                                </Button>
                              </Box>
                            </Grid>
                          </Box>
                        )
                      )}
                    </>
                  )}
                </FieldArray>
              </Paper>

              <Divider />

              <FieldArray name='questions'>
                {({ push, remove }: FieldArrayRenderProps) => (
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                      }}
                    >
                      <Typography variant='h4'>Questions</Typography>
                      <Button
                        variant='contained'
                        onClick={() =>
                          push({
                            imageLink: '',
                            question: '',
                            choices: [
                              { choice: '', isCorrect: false },
                              { choice: '', isCorrect: false },
                            ],
                          })
                        }
                        startIcon={<AddIcon />}
                      >
                        Add Question
                      </Button>
                    </Box>

                    {(values.questions || []).map(
                      (question: IQuestion, index: number) => (
                        <Paper key={index} sx={{ mb: 3, px: 3, pb: 3 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 2,
                            }}
                          >
                            <Typography variant='h6' sx={{ mt: 3, mb: 2 }}>
                              Question {index + 1}
                            </Typography>
                            <Box>
                              <Button
                                color='error'
                                onClick={() => remove(index)}
                                sx={{ mt: 2 }}
                                endIcon={<DeleteIcon />}
                              >
                                Remove Question
                              </Button>
                            </Box>
                          </Box>
                          <Field
                            component={TextField}
                            name={`questions.${index}.question`}
                            label='Question'
                            fullWidth
                            sx={{ mb: 2 }}
                          />{' '}
                          <Field
                            component={TextField}
                            name={`questions.${index}.imageLink`}
                            label='Image Link'
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <FieldArray name={`questions.${index}.choices`}>
                            {({
                              push,
                              remove,
                              form: {
                                values,
                                handleChange,
                                handleBlur,
                                handleReset,
                              },
                            }: FieldArrayRenderProps) => (
                              <Box>
                                <Divider />
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Typography variant='h6' sx={{ mb: 0 }}>
                                    Choices
                                  </Typography>
                                  <Button
                                    variant='contained'
                                    onClick={() =>
                                      push({ choice: '', isCorrect: false })
                                    }
                                  >
                                    Add Choice
                                  </Button>
                                </Box>
                                {(question.choices || []).map(
                                  (choice, choiceIndex) => (
                                    <Box key={choiceIndex} sx={{ mb: 2 }}>
                                      <Divider />
                                      <Grid container spacing={3}>
                                        <Grid item xs={8}>
                                          <Field
                                            component={TextField}
                                            name={`questions.${index}.choices.${choiceIndex}.choice`}
                                            label={`Choice ${choiceIndex + 1}`}
                                            fullWidth
                                            sx={{ mb: 1 }}
                                          />
                                        </Grid>
                                        <Grid item xs={2}>
                                          <FormControl>
                                            <FormControlLabel
                                              control={
                                                <Checkbox
                                                  id={`questions.${index}.choices.${choiceIndex}.isCorrect`}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  onReset={handleReset}
                                                  checked={
                                                    (values as IActivity)
                                                      .questions[index]
                                                      ?.choices[choiceIndex]
                                                      ?.isCorrect || false
                                                  }
                                                />
                                              }
                                              label='Is Correct'
                                            />
                                          </FormControl>
                                        </Grid>
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <Button
                                            color='error'
                                            variant='outlined'
                                            onClick={() => remove(choiceIndex)}
                                            sx={{ ml: 2 }}
                                            endIcon={<DeleteIcon />}
                                          >
                                            Remove Choice
                                          </Button>
                                        </Box>
                                      </Grid>
                                    </Box>
                                  )
                                )}
                              </Box>
                            )}
                          </FieldArray>
                        </Paper>
                      )
                    )}
                  </Box>
                )}
              </FieldArray>
              <Box mb={5}>&nbsp;</Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}
              >
                <Box position='fixed' bottom={20}>
                  <Button variant='outlined' onClick={onClose} sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button variant='contained' color='primary' type='submit'>
                    Save Activity
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Dialog>
  );
};

export default EditActivity;
