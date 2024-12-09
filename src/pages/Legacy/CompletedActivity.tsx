import { Divider } from '@mui/material';
import '../../styles/CompletedActivity.css';

import { UserWrapper } from '~/components';

const CompletedActivity = () => {
  return (
    <>
      <UserWrapper />
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
