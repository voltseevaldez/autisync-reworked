import React, { MouseEvent, useEffect, useState } from 'react';

import {
  VisibilityOffOutlined as HideIcon,
  VisibilityOutlined as ShowIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  ButtonBase,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField as MuiTextField,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { Select, TextField } from 'formik-mui';
import { useNavigate } from 'react-router-dom';
import { INewUser } from 'types/INewIUser';
import * as Yup from 'yup';

import { AuthBase } from '~/components';
import {
  SetDocument,
  auth,
  collections,
  database,
  useErrorNotif,
  useLogin,
} from '~/utils';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Required')
    .nullable(),
  firstName: Yup.string().required('Required').nullable(),
  middleInitial: Yup.string().max(2, 'Must be a single character').nullable(),
  lastName: Yup.string().required('Required').nullable(),
  username: Yup.string().required('Required').nullable(),
  birthday: Yup.date().required('Required').nullable(),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
    .required('Required')
    .nullable(),
  password: Yup.string()
    .min(8, 'Minimum of 8 characters')
    .required('Required')
    .nullable(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Required')
    .nullable(),
});

type ISignUpSchema = {
  email: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  username: string;
  birthday: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

const FormikDatePicker = ({ field, form, ...props }: any) => {
  const { setFieldValue } = useFormikContext();

  return (
    <DatePicker
      {...field}
      {...props}
      onChange={(value) => setFieldValue(field.name, value)}
      renderInput={(params: any) => <MuiTextField {...params} />}
    />
  );
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const showError = useErrorNotif();
  const { loggedIn, isLoading, checkState } = useLogin('/sign-up');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const theme = useTheme();

  const [showPassword, setShowpassword] = useState<boolean>(false);

  const handleChangeVisibility = () =>
    setShowpassword((curr: boolean) => !curr);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (loggedIn && !isLoading) {
      navigate('/legacy/home2');
    } else {
      checkState();
    }
  }, [isLoading, loggedIn, navigate, checkState]);

  const handleSubmit = async (
    values: ISignUpSchema
    // { resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential.user) {
        const { uid, displayName } = userCredential.user;
        const userRef = doc(database, collections.users.string + '/' + uid);
        const user = await getDoc(userRef);
        if (!user.exists()) {
          // Create a new firestore user if user doesn't exist yet
          await SetDocument<INewUser>({
            docRef: userRef,
            data: {
              id: uid,
              contactNo: '',
              displayName: displayName || values.username || 'New User',
              birthday: new Date(values.birthday).toISOString(),
              email: values.email,
              firstName: values.firstName,
              middleInitial: values.middleInitial,
              lastName: values.lastName,
              username: values.username,
              gender: values.gender,
              password: values.password,
              roles: ['customer'],
            },
          });
          const loginCredentials = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          if (loginCredentials.user) navigate('/home');
        }
      }
      // window.setTimeout(() => resetForm(), 1500);
    } catch (err: any) {
      console.error('error logs', err.message);
      showError(err.message);
    } finally {
      setIsSubmitting(false);
    }
    // navigate("/home");
  };
  return (
    <AuthBase
      carouselItems={[
        {
          img: 'assets/images/logo.png',
          text: 'Sign up',
        },
      ]}
    >
      <Box
        display='flex'
        minHeight='100vh'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Typography
          color='textPrimary'
          gutterBottom
          variant='h4'
          style={{ textAlign: 'center' }}
        >
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            middleInitial: '',
            lastName: '',
            username: '',
            birthday: '',
            gender: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {' '}
            <Box display='flex' flexDirection='column'>
              <Stack spacing={2} direction='row' mb={2}>
                <Field
                  name='firstName'
                  label='First Name'
                  component={TextField}
                  fullWidth
                  autoFocus
                />
                <Field
                  name='middleInitial'
                  label='Middle Initial'
                  component={TextField}
                  fullWidth
                />
                <Field
                  name='lastName'
                  label='Last Name'
                  component={TextField}
                  fullWidth
                />
              </Stack>

              <Stack spacing={2} direction='row' mb={2}>
                <Field
                  name='username'
                  label='Username'
                  component={TextField}
                  fullWidth
                />
              </Stack>

              <Stack spacing={2} direction='row' mb={2}>
                <FormControl fullWidth>
                  <Field
                    component={Select}
                    type='text'
                    label='Gender'
                    name='gender'
                    inputProps={{
                      name: 'gender',
                      id: 'gender',
                    }}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                  </Field>
                </FormControl>
                <FormControl fullWidth>
                  <Field
                    name='birthday'
                    component={FormikDatePicker}
                    label='Birthday'
                  />
                </FormControl>
              </Stack>

              <Box mb={2}>
                <Field
                  fullWidth
                  component={TextField}
                  required
                  name='password'
                  label='Password'
                  autoComplete='password'
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleChangeVisibility}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <HideIcon /> : <ShowIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box mb={2}>
                <Field
                  fullWidth
                  component={TextField}
                  required
                  name='confirmPassword'
                  label='Confirm Password'
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleChangeVisibility}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <HideIcon /> : <ShowIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <Field
                  type='email'
                  name='email'
                  label='Email'
                  component={TextField}
                  fullWidth
                />
              </Box>

              <LoadingButton
                loading={isSubmitting}
                style={{ marginTop: theme.spacing(2) }}
                variant='contained'
                type='submit'
              >
                Sign up
              </LoadingButton>
            </Box>{' '}
            <Box mt={1}>
              <Typography variant='caption'>
                Already have an account?{' '}
                <ButtonBase
                  sx={{
                    ...theme.typography.caption,
                    fontWeight: 'bold',
                  }}
                  onClick={() => navigate('/')}
                >
                  Login to your account
                </ButtonBase>
              </Typography>
            </Box>
          </Form>
        </Formik>
      </Box>
    </AuthBase>
  );
};

export default SignUpPage;
