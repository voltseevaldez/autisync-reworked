import '../../styles/Login.css';
import { BaseSyntheticEvent, useState } from 'react';

import TextField from '@mui/material/TextField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom';

import { auth, database } from '~/utils';

// img

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  const SignUpClick = () => {
    navigate('/SignUp');
  };

  const handleLogin = async (event: BaseSyntheticEvent) => {
    event.preventDefault(); // Prevent default form submission

    setLoading(true); // Set loading to true
    try {
      // Get user document by username from Firestore
      const userDoc = await getDoc(doc(database, 'users', username));
      if (!userDoc.exists()) {
        alert('Username does not exist');
        setLoading(false);
        return;
      }

      const userEmail = userDoc.data().email; // Get the user's email

      // Sign in with Firebase using email and password
      await signInWithEmailAndPassword(auth, userEmail, password);
      // console.log('User logged in successfully');
      navigate('/Home2'); // Navigate to Home2 on successful login
    } catch (error: any) {
      console.error('Error logging in:', error);
      alert(error?.message);
      setLoading(false); // Set loading to false on error
    }
  };

  // Fallback rendering while loading
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className='background-container'>
        <div className='logo-container'>
          <img
            src={'/assets/images/logo.png'}
            alt='Logo'
            className='logo-img'
          />
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

          <div className='login-container'>
            <p className='Login-Text'>Login</p>
            <form onSubmit={handleLogin}>
              {' '}
              {/* Add form submission handling */}
              <TextField
                required
                label='Username'
                variant='standard'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  width: '250px',
                  '& .MuiInputBase-input': {
                    color: '#375A63',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#375A63',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#375A63',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#375A63',
                  },
                }}
              />
              <TextField
                required
                label='Password'
                type='password'
                variant='standard'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  width: '250px',
                  '& .MuiInputBase-input': {
                    color: '#375A63',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#375A63',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#375A63',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#375A63',
                  },
                }}
              />
              <div className='forgotpass-div'>
                <p className='forgot-pass'>Forgot password?</p>
              </div>
              <p onClick={SignUpClick} className='sign-up'>
                Sign Up
              </p>
              <button type='submit' className='login-button'>
                Login
              </button>{' '}
              {/* Use type="submit" */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
