import '../../styles/home2.css';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { UserWrapper } from '~/components';

const Home2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const BadgesClick = () => {
    navigate('legacy/badges-empty');
  };

  // const LogoClick = () => {
  //   navigate('/');
  // };

  return (
    <>
      {/* NavBar */}
      <UserWrapper />
      {/* <nav className='navbar'>
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
      </nav> */}

      {/* Modal */}
      {isModalOpen && (
        // TODO: Sign out functionality
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

      {/* Banner */}
      <div className='banner'>
        <img
          src='/assets/images/banner.png'
          alt='App Logo'
          className='banner1'
        />
        <button
          className='banner-button'
          onClick={() => navigate('/quiz/category')}
        >
          Start Journey
        </button>
      </div>

      {/* Section 1 */}
      <div className='section1'>
        <h1 className='about'>About Us</h1>
        <p>
          At Educational Website Name, we are committed to providing a
          supportive and inclusive
          <br></br>
          learning environment for individuals with autism. We understand the
          challenges that
          <br></br>
          individuals on the autism spectrum may face, such as difficulties with
          focus and managing
          <br></br>
          distractions. That is why we are dedicated to creating a
          user-friendly, visually appealing
          <br></br>
          website that not only caters to their unique needs but also sparks
          interest and engagement.
          <br></br>
          <br></br>
          <br></br>
          Our team of passionate educators, therapists, and professionals
          collaborates to develop
          <br></br>
          content that is not only accessible but also captivating, ensuring
          that individuals with autism
          <br></br>
          can stay engaged and motivated throughout their learning journey.
          <br></br>
          Our website design is carefully crafted to minimize overwhelming
          stimuli and distractions
          <br></br>
          while maximizing accessibility and ease of navigation. Through clear
          layouts, intuitive
          <br></br>
          interfaces, and engaging visuals, we strive to create an environment
          where individuals with
          <br></br>
          autism can focus on learning without unnecessary barriers. By
          combining evidence-based
          <br></br>
          practices with innovative technology, we aim to provide a seamless
          learning experience that
          <br></br>
          fosters independence, confidence, and a love for learning. Join us in
          our mission to empower
          <br></br>
          individuals with autism to unlock their full potential and thrive in
          both academic and personal
          <br></br>pursuits.
        </p>

        <img
          src='/assets/images/img1.png'
          alt='Image'
          className='section1-img2'
        />

        {/* Lesson Types */}
        <div className='lesson-type'>Lesson Types</div>
        <div className='lessons-section'>
          {/* Lesson Contents */}
          <div className='academic'>
            <img
              src='/assets/images/academic.png'
              alt='Academic Logo'
              className='academic-logo'
            />
            <div className='academic-desc'>
              Academic learning refers to the <br></br>process of acquiring
              knowledge,<br></br>
              skills, and <br></br>critical thinking <br></br>through formal
              education.
            </div>
          </div>

          <div className='social'>
            <img
              src='/assets/images/social.png'
              alt='Social Logo'
              className='social-logo'
            />
            <div className='social-desc'>
              Social learning is a theory that<br></br> emphasizes learning
              through
              <br></br>observation <br></br>and interaction <br></br>with others
              in a social context.
            </div>
          </div>

          <div className='objects'>
            <img
              src='/assets/images/objects.png'
              alt='Objects Logo'
              className='objects-logo'
            />
            <div className='objects-desc'>
              Object learning refers to <br></br>the process by which
              individuals or <br></br>machines acquire<br></br> knowledge about
              physical objects <br></br>through observation, interaction,{' '}
              <br></br>and analysis.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2;
