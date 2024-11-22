import '../../styles/AcademicActivityChat.css';
import { useState } from 'react';

import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const AcademicActivityChat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const BadgesClick = () => {
    navigate('/legacy/badges-empty');
  };

  const LogoClick = () => {
    navigate('/');
  };

  return (
    <>
      {/* NavBar */}
      <nav className='navbar'>
        <div className='navbar-logo'>
          <img
            onClick={LogoClick}
            src='/assets/images/logo.png'
            alt='App Logo'
          />
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
          src='/assets/images/profile.png'
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

      <div className='academic-activity1-header'>
        <p className='AA1-Text'>ACADEMIC</p>
      </div>

      {/* DIViDER 7 */}

      <div className='divider7-container'>
        <div className='divider_7'>
          <Divider style={{ borderColor: '#F9EFCA', borderWidth: '3px' }} />
        </div>
      </div>

      {/* ACTIVITY CONTENT */}
      <div className='activity-container'>
        <div className='activity1-card'>
          <div className='question'>
            <p className='question1-text'>How many Sheep can you see?</p>
          </div>
          <div className='image1-container'>
            <div className='image-item1'>
              <img
                className='sheep1'
                src='/assets/images/sheeps.png'
                alt='Sheep 1'
              ></img>
            </div>
          </div>

          <div className='answer-choice-container'>
            <div className='answer-choice-header'>
              <p className='answer-header-text'>Choose your answer:</p>
            </div>
          </div>

          <div className='answers-container'>
            <div className='choice1'>
              <button className='choice1-button'>ONE</button>
            </div>
            <div className='choice2'>
              <button className='choice2-button'>TWO</button>
            </div>
            <div className='choice3'>
              <button className='choice3-button'>THREE</button>
            </div>
            <div className='choice4'>
              <button className='choice4-button'>FOUR</button>
            </div>
          </div>
        </div>

        {/* Chhat Card */}
        <div className='chat-card'>
          <div className='stickers-container'>
            <div className='row1'>
              <div className='box1'></div>
              <div className='box2'></div>
              <div className='box3'></div>
            </div>
            <div className='row2'>
              <div className='box4'></div>
              <div className='box5'></div>
              <div className='box6'></div>
            </div>
            <div className='row3'>
              <div className='box7'></div>
              <div className='box8'></div>
              <div className='box9'></div>
            </div>
          </div>
          <div className='new-div-for-chat'></div>
          <div className='chat-field-container'></div>
        </div>
      </div>
    </>
  );
};

export default AcademicActivityChat;
