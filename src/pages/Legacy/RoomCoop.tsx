import '../../styles/RoomCoop.css';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const RoomCoop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const BadgesClick = () => {
    navigate('/BadgesEmpty');
  };

  const LogoClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* NavBar */}
      <nav className='navbar'>
        <div className='navbar-logo'>
          <img onClick={LogoClick} src='images/logo.png' alt='App Logo' />
        </div>
        <ul className='navbar-links'>
          <li>
            <a href='#about'>About Us</a>
          </li>
          <li>
            <a href='#contact'>Contact Us</a>
          </li>
          <li>
            <a href='#journey'>Journey</a>
          </li>
        </ul>
        <img
          src='images/profile.png'
          alt='Profile Logo'
          onClick={openModal}
          className='profile-logo'
        />
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <h2>Hello!</h2>
            <p>JHAUNN</p>
            <button onClick={BadgesClick} className='badges'>
              Badges
            </button>
            <button className='logout'>Logout</button>
          </div>
        </div>
      )}

      {/* Room or Lobby (Solo) */}
      <div className='the-everything-container'>
        <div className='solo-lobby-container'>
          <div className='solo-lobby-header'>
            <img
              className='header-logo'
              src='images/academic-logo.png'
              alt='Academic Logo'
            ></img>
            <h1 className='room-header'>ACADEMIC</h1>
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

        {/* Lobby Content */}
        <div className='lobby-content-container'>
          {/* Left Content */}
          <div className='solo-left-cont'>
            <div className='chat2-card'>
              <div className='chat2-messages'></div>
              <div className='chat2-input'>
                <TextField
                  hiddenLabel
                  id='filled-hidden-label-normal'
                  defaultValue='Chat'
                  variant='filled'
                  sx={{
                    marginBottom: '20px',
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'white', // Input background color
                      fontFamily: 'Poppins',
                      borderRadius: '20px', // Custom border radius
                      boxShadow: 'none', // Remove box-shadow
                      width: '380px',
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
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className='solo-right-cont'>
            <div className='room-code'>Room Number: XXXX</div>
            <div className='list-people-header'>
              <p className='people-list'>People:</p>
            </div>
            <div className='list-people2'>
              <div className='player1'>
                <div className='player-img'>
                  <img src='images/profile.png' className='player-logo'></img>
                </div>
                <div className='player-name'>Jhaunn Evaldez</div>
              </div>

              <div className='player2'>
                <div className='player2-img'>
                  <img src='images/profile.png' className='player-logo'></img>
                </div>
                <div className='player2-name'>Rigel Sarsaba</div>
              </div>
            </div>

            {/* DIViDER 6 */}

            <div className='divider_6'>
              <Divider style={{ borderColor: '#06325A', borderWidth: '3px' }} />
            </div>

            {/* Button */}
            <div className='lobby-start-button'>
              <button className='start1-button'>START!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCoop;
