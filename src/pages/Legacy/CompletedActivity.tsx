import '../../styles/CompletedActivity.css';
import { useState } from 'react';

import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const CompletedActivity = () => {
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

      <div className='academic-activity1-header'>
        <p className='AA1-Text'>ACADEMIC</p>
      </div>

      {/* DIViDER 7 */}
      <div className='divider7-container'>
        <div className='divider_7'>
          <Divider style={{ borderColor: '#F9EFCA', borderWidth: '3px' }} />
        </div>
      </div>

      {/* Content */}
      <div className='parent-for-card'>
        <div className='card'>
          <div className='card-title'>
            <h2>CONGRATULATIONS</h2>
          </div>

          <div className='card-text'>
            <p>you have passed</p>
          </div>

          <div className='card-image'>
            <img src='images/congrats-logo.png' alt='Academic Activity 1' />
          </div>

          <div className='card-text'>
            <p>Reward Obatined!</p>
          </div>

          <div className='card-button-container'>
            <button className='card-button'>CONTINUE</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedActivity;
