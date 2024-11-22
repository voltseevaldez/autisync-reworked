import { FC } from 'react';

import '../../styles/BadgesPage.css';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

import { UserWrapper } from '~/components';
import { IUser } from '~/types';
import { collections, useListen, useLogin } from '~/utils';

const BadgesPage = () => {
  const { user, isLoading } = useLogin();

  if (isLoading) return <p>Loading...</p>;
  return <> {<BadgeComponent userId={user?.uid || ''} />}</>;
};

/**
 * Integrations
 * -------------
 * - logged `user`
 * - display the badges that user has collected
 *
 * Possible improvements
 * -------------
 * - make this mobile friendly by using mui Stack or mui Grid
 *
 */
const BadgeComponent: FC<{ userId: string }> = ({ userId }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  // const LogoClick = () => {
  //   navigate('/');
  // };

  const navigate = useNavigate();
  const { docs: userInfos, isLoading } = useListen<IUser>({
    collectionRef: collections.users.ref,
  });
  const userInfo = userInfos?.find((user) => user.id === userId) || undefined;

  const CollectClick = () => {
    navigate('/legacy/category-list');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* NavBar */}
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
      <UserWrapper />

      {/* Modal */}
      {/* {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <h2>Hello!</h2>
            <p>JHAUNN</p>
            <button className='badges'>Badges</button>
            <button className='logout'>Logout</button>
          </div>
        </div>
      )} */}

      <div className='banner_1'>
        <img
          src='/assets/images/badges_banner.png'
          alt='Badges Banner'
          className='badges-banner_1'
          style={{
            objectFit: 'cover',
          }}
        />
        <div className='divider_3'>
          <Divider
            style={{ borderColor: '#F7AF5A', borderWidth: '3px', width: '30%' }}
          />
        </div>
      </div>

      {userInfo && (
        <div className='content-container'>
          <div className='motto'>
            <p className='welcome'>Welcome!</p>
            <p className='name'>{userInfo.firstName}</p>
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
            <button onClick={CollectClick} className='collect'>
              Collect Badges!
            </button>
            <Divider
              style={{
                borderColor: '#06325A',
                borderWidth: '3px',
                width: '490px',
              }}
            />
            <div className='badgest-list'>
              {(userInfo?.badges || []).length > 0 ? (
                <img
                  src='/assets/images/badges.png'
                  alt='Badge 1'
                  className='badge_1'
                />
              ) : (
                <p className='no-badge-text'>
                  Perform Activities to Collect Badges!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BadgesPage;
