import '~/styles/DifficultyPage.css';
import { Divider } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { UserWrapper } from '~/components';
import { categories } from '~/data';

const DifficultyPage = () => {
  const { category } = useParams();

  const selectedCategory = categories.find(
    ({ name }) => name.toLowerCase() === (category || '')?.toLowerCase()
  );

  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty: string) =>
    navigate(`/quiz/${category}/${difficulty}/choose`);

  const difficulty = ['easy', 'medium', 'hard'];

  return (
    <>
      <UserWrapper />

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
          <img
            className='category-logo'
            src={selectedCategory?.categoryLogoLink}
          ></img>
          <div className='category-text'>
            {selectedCategory?.name.toUpperCase()}
          </div>
        </div>

        <div className='difficulties-buttons'>
          {/* <button className='medium-button'>MEDIUM</button>
          <button className='hard-button'>HARD</button> */}
          {difficulty.map((diff) => (
            <button
              key={diff}
              className={`${diff}-button`}
              onClick={() => handleDifficultySelect(diff)}
            >
              {diff.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default DifficultyPage;
