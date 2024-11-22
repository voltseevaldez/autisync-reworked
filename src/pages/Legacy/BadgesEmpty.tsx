import { useState } from 'react';

import '../../styles/BadgesEmpty.css';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const BadgesEmpty = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const LogoClick = () => {
    navigate('/');
  };

  const CollectBadgesClick = () => {
    navigate('/CategoryList');
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
            <button className='badges'>Badges</button>
            <button className='logout'>Logout</button>
          </div>
        </div>
      )}

      <div className='banner_1'>
        <img
          src='images/badges_banner.png'
          alt='Badges Banner'
          className='badges-banner_1'
        />
        <div className='divider_4'>
          <Divider
            style={{ borderColor: '#F7AF5A', borderWidth: '3px', width: '30%' }}
          />
        </div>
      </div>

      <div className='content-container'>
        <div className='motto'>
          <p className='welcome'>Welcome!</p>
          <p className='name'>Jhaunn</p>
          <p className='rewardtext'>
            This are all your rewards and<br></br>
            achievements that you have obtained<br></br>
            throught your journey in learning.<br></br>
            <br></br>
            Keep it up!
          </p>
        </div>

        <div className='badges-section'>
          <p className='badges-header'>Badges</p>
          <button className='collect' onClick={CollectBadgesClick}>
            Collect Badges!
          </button>
          <Divider
            style={{
              borderColor: '#06325A',
              borderWidth: '3px',
              width: '490px',
            }}
          />
          <div className='no-badge'>
            <p className='no-badge-text'>
              Perform Activities to Collect Badges!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BadgesEmpty;
