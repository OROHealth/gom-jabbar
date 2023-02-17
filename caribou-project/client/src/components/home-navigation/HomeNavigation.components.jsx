import { useNavigate } from 'react-router-dom';
// stylesheet
import '@components/home-navigation/HomeNavigation.styles.scss';

// storage
import useLocalStorage from '@hooks/useLocalStorage';

// Components
import Button from '@components/button/Button';

const HomeNavigation = () => {
  const loggedIn = useLocalStorage('loggedIn', 'get');
  const navigate = useNavigate();
  const handleNavigateToDashboard = () => {
    if (loggedIn) {
      navigate('/app/dashboard');
    }
  };
  return (
    <>
      <nav className="home-navbar-container">
        <div className="home-navbar">
          <Button onClick={handleNavigateToDashboard}>Dashboard</Button>
        </div>
      </nav>
    </>
  );
};

export default HomeNavigation;
