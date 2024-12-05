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
    navigate('/quiz/category');
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <UserWrapper />
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
              {userInfo?.badges && userInfo.badges.length > 0 ? (
                <div className='badge-container grid grid-cols-3 gap-4'>
                  {userInfo.badges.map((badge, index) => (
                    <img
                      key={index}
                      src={badge.imageLink}
                      alt={`Badge ${index + 1}`}
                      className={`badge_${index + 1}`}
                    />
                  ))}
                </div>
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
