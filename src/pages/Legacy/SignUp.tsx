import { BaseSyntheticEvent, useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import '../../styles/SignUp.css';
import { auth } from '~/utils';

const SignUp = () => {
  const navigate = useNavigate();

  // Form data and state management
  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    surname: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthday: null,
    gender: '',
    email: '',
  });

  const handleInputChange = (event: BaseSyntheticEvent) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Firebase authentication handling
  const handleSignUp = async (event: BaseSyntheticEvent) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check if the birthday field is filled
    if (!formData.birthday) {
      alert('Please enter your birthday.');
      return;
    }

    try {
      // Create user with Firebase Authentication
      const _userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // console.log('User created successfully:', userCredential.user);

      // Navigate to dashboard after successful sign-up
      navigate('/dashboard');
    } catch (error: any) {
      // Handle and display any errors from Firebase
      console.error('Error signing up:', error);
      alert(error?.message || '');
    }
  };

  const LoginClick = () => {
    navigate('/Login');
  };

  return (
    <div className='background-container'>
      <div className='logo-container'>
        <img src={'/assets/images/logo.png'} alt='Logo' className='logo-img' />
      </div>

      <div className='parent-container'>
        <div className='image-container'>
          <img
            style={{ objectFit: 'cover !important' as any }}
            src={'/assets/images/Login.png'}
            alt='Login Image'
            className='signup-img'
          />
        </div>

        <div className='signup-container'>
          <form onSubmit={handleSignUp}>
            <p className='Signup-Text'>Sign Up</p>

            {/* Name fields */}
            <div className='first-row'>
              <TextField
                required
                name='firstName'
                label='Name'
                value={formData.firstName}
                onChange={handleInputChange}
                variant='standard'
                sx={{ width: '150px' }}
              />
              <TextField
                required
                name='middleInitial'
                label='M.I'
                value={formData.middleInitial}
                onChange={handleInputChange}
                variant='standard'
                sx={{ width: '45px' }}
              />
              <TextField
                required
                name='surname'
                label='Surname'
                value={formData.surname}
                onChange={handleInputChange}
                variant='standard'
                sx={{ width: '120px' }}
              />
            </div>

            {/* Username */}
            <div className='second-row'>
              <TextField
                required
                name='username'
                label='Username'
                value={formData.username}
                onChange={handleInputChange}
                variant='standard'
                sx={{ width: '370px' }}
              />
            </div>

            {/* Password and confirm password */}
            <div className='third-row'>
              <TextField
                required
                name='password'
                label='Password'
                type='password'
                value={formData.password}
                onChange={handleInputChange}
                variant='standard'
                sx={{ width: '370px' }}
              />
            </div>

            <div className='fourth-row'>
              <TextField
                required
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                variant='standard'
                sx={{ width: '370px' }}
              />
            </div>

            {/* DatePicker and Gender fields */}
            <div className='fifth-row'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label='MM/DD/YY'
                    value={formData.birthday}
                    onChange={(newValue) =>
                      setFormData({ ...formData, birthday: newValue })
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={formData.gender}
                    label='Gender'
                    onChange={(event) =>
                      setFormData({ ...formData, gender: event.target.value })
                    }
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>

            {/* Email */}
            <div className='sixth-row'>
              <TextField
                required
                name='email'
                label='Email Address'
                value={formData.email}
                onChange={handleInputChange}
                variant='standard'
                sx={{ width: '370px' }}
              />
            </div>

            {/* Buttons */}
            <div className='bottom-content'>
              <p onClick={LoginClick} className='login'>
                Login
              </p>
              <button type='submit' className='signup-button'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
