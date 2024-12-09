import '~/styles/DifficultyPage.css';
import { Divider } from 'antd';

import { UserWrapper } from '~/components';

const DifficultyPage = () => {
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
