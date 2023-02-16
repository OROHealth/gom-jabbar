import { useNavigate } from 'react-router-dom';
// stylesheet
import '@components/home-navigation/HomeNavigation.styles.scss';

// Components
import Button from '@components/button/Button';

const HomeNavigation = () => {
  const navigate = useNavigate();
  const handleNavigateToDashboard = () => {
    navigate('/app/dashboard');
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
