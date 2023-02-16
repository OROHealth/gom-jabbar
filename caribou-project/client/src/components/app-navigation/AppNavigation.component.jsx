// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// stylesheet
import '@components/app-navigation/AppNavigation.styles.scss';

// Components
// import Button from '@components/button/Button';
import { FaAngleDown } from 'react-icons/fa';

const AppNavigation = () => {
  // const navigate = useNavigate();
  const avatarImage = useSelector((state) => state.user.avatarImage);
  // const handleNavigateToDashboard = () => {
  //   navigate('/dashboard');
  // };

  useEffect(() => {});

  return (
    <>
      <nav className="app-navbar-container">
        <span className="nav-items">
          <div>
            <p>Welcome caribou!</p>
          </div>
          <div className="image-wrapper">
            <img src={avatarImage} alt="Avatar image" />
          </div>
          <FaAngleDown />
        </span>
      </nav>
    </>
  );
};

export default AppNavigation;
