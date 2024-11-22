import { useState } from 'react';

import '~/styles/DifficultyPage.css';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const DifficultyPage = () => {
  // for Profile logo modal //
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // for join now modal //

  const navigate = useNavigate();

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
            <button className='badges'>Badges</button>
            <button className='logout'>Logout</button>
          </div>
        </div>
      )}

      <div className='difficulty-parent'>
        <div className='header1-content'>
          <div className='header1-text'>
            <p className='difficulty-text'>Choose Difficulty</p>
          </div>
        </div>
      </div>

      <div className='divider2-container'>
        <div className='divider_2'>
          <Divider style={{ borderColor: '#06325A', borderWidth: '3px' }} />
        </div>
      </div>

      <div className='difficulty-content-container'>
        <div className='category-picture'>
          <img className='category-logo' src='images/academic-logo.png'></img>
          <div className='category-text'>ACADEMIC</div>
        </div>

        <div className='difficulties-buttons'>
          <button className='easy-button'>EASY</button>
          <button className='medium-button'>MEDIUM</button>
          <button className='hard-button'>HARD</button>
        </div>
      </div>
    </>
  );
};

export default DifficultyPage;
