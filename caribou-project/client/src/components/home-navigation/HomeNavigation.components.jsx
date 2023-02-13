import { useNavigate } from 'react-router-dom';
// stylesheet
import '@components/home-navigation/HomeNavigation.styles.scss';

// Components

const HomeNavigation = () => {
  const navigate = useNavigate();
  const handleNavigateToDashboard = () => {
    navigate('/dashboard');
  };
  return (
    <>
      <nav className="home-navbar-container">
        <button onClick={handleNavigateToDashboard}>Dashboard</button>
      </nav>
    </>
  );
};

export default HomeNavigation;
