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

  const items = [
    {
      id: 1,
      image: '/assets/images/academic.png',
      alt: 'Academic',
      description:
        'The ACADEMIC part allows users with autism gives them a voice to share their thoughts and preferences about learning. With clear language and visuals, it helps them express what they enjoy, what challenges them, and how they feel in the classroom. by using questions such as basic math and more',
    },
    {
      id: 2,
      image: '/assets/images/social.png',
      alt: 'Social',
      description:
        'The SOCIAL aids to helps them understand  and to exercise users to help them express their feelings and preferences about social interactions. Using simple methods and visuals, it allows them to understand and develop what social queues and behaviors to further aid them in how they prefer to connect with others.',
    },
    {
      id: 3,
      image: '/assets/images/objects.png',
      alt: 'Objects',
      description:
        'The OBJECTS category is a simple and fun way to engage exploration on users, This helps them in their perception, imagination, and problem-solving skills. to understand and familiarize them into daily items that they encounter.',
    },
  ];

  const items2 = [
    {
      id: 1,
      image: '/assets/images/food.png',
      alt: 'FOODS',
      description:
        'The FOOD identification encourages to help recognize and describe different foods based on visual clues which builds familiarity with various foods in a fun, low-pressure way.',
    },
    {
      id: 2,
      image: '/assets/images/action.png',
      alt: 'Actions',
      description:
        'The ACTION identification encourages them to recognize and describe everyday actions. it helps engage their understanding of movements, routines, and reactions. This activity promotes cognitive development and communication skills by linking actions to words and concepts.',
    },
  ];

  const difficulties = [
    {
      id: 1,
      type: 'Easy',
      description:
        'Perfect for beginners or those who are just starting to learn. The flashcards feature simple, familiar images or words that help reinforce basic skills',
    },
    {
      id: 2,
      type: 'Medium',
      description:
        'Aimed at students with some experience. These flashcards present slightly more complex tasks, encouraging students to recognize and understand a broader range of concepts.',
    },
    {
      id: 3,
      type: 'Hard',
      description:
        'Designed for more advanced learners when ready. The flashcards challenge students to engage with more intricate ideas and scenarios, helping to further develop their identification and cognitive skills.',
    },
  ];
  // const LogoClick = () => {
  //   navigate('/');
  // };

  return (
    <>
      <UserWrapper />

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
      <div className='flex space-y-4 flex-col relative items-center justify-center'>
        <img
          className='w-[1600px] h-[450px] mx-20'
          src='/assets/images/banner.png'
        ></img>
        <button
          onClick={() => navigate('/quiz/category')}
          className='text-[#FFE381] text-4xl z-10 right-[7%] -bottom-5 absolute rounded-3xl bg-[#375A63] w-80 h-28'
        >
          Start Journey
        </button>
      </div>

      {/* Section 1 */}
      <div className='flex flex-col items-start mx-40 mt-20'>
        <h1 className='text-4xl underline'>About Us</h1>
        <div className='pl-4 pt-4 flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-center gap-8'>
          <p>
            At Educational Website Name, we are committed to providing a
            supportive and inclusive learning environment for individuals with
            autism. We understand the challenges that individuals on the autism
            spectrum may face, such as difficulties with focus and managing
            distractions. That is why we are dedicated to creating a
            user-friendly, visually appealing website that not only caters to
            their unique needs but also sparks interest and engagement. Our team
            of passionate educators, therapists, and professionals collaborates
            to develop content that is not only accessible but also captivating,
            ensuring that individuals with autism can stay engaged and motivated
            throughout their learning journey.
            <br></br>
            <br></br>
            Our website design is carefully crafted to minimize overwhelming
            stimuli and distractions while maximizing accessibility and ease of
            navigation. Through clear layouts, intuitive interfaces, and
            engaging visuals, we strive to create an environment where
            individuals with autism can focus on learning without unnecessary
            barriers. By combining evidence-based practices with innovative
            technology, we aim to provide a seamless learning experience that
            fosters independence, confidence, and a love for learning. Join us
            in our mission to empower individuals with autism to unlock their
            full potential and thrive in both academic and personal pursuits.
          </p>

          <img
            className='w-[640px] h-auto'
            src='/assets/images/img1.png'
            alt='Image'
          />
        </div>
      </div>
      <div className='items-center flex flex-col justify-center'>
        {/* Lesson Types */}
        <div className='py-20 text-4xl underline'>Categories</div>
        <div className='items-center flex flex-row'>
          {items.length > 1 &&
            items.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-y-10 items-center justify-center w-[420px] mx-10'
              >
                <img
                  className='w-[400px] object-center h-[400px]'
                  src={item.image}
                  alt={item.alt}
                />
                <p className='w-[400px] h-[200px]'>{item.description}</p>
              </div>
            ))}
        </div>
        <div className='items-center justify-center flex flex-row'>
          {items2.length > 1 &&
            items2.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-y-10 items-center justify-center w-[420px] mx-10'
              >
                <img
                  className='w-[400px] object-center h-[400px]'
                  src={item.image}
                  alt={item.alt}
                />
                <p className='w-[400px] h-[200px]'>{item.description}</p>
              </div>
            ))}
        </div>
      </div>
      <div className='items-center flex flex-col justify-center'>
        {/* Lesson Types */}
        <div className='py-10 text-4xl underline'>Difficulties</div>
        <div className='items-center flex flex-row'>
          {difficulties.length > 1 &&
            difficulties.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-y-10 items-center justify-center w-[420px] mx-10'
              >
                <h1 className='w-[200px] text-center text-4xl bg-[#F9EFCA] p-4 rounded-lg object-center h-auto'>
                  {item.type}
                </h1>
                <p className='w-[400px] h-[400px]'>{item.description}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home2;
