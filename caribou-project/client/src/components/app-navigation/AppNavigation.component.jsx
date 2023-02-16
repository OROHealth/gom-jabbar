// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// stylesheet
import '@components/app-navigation/AppNavigation.styles.scss';

// Components
// import Button from '@components/button/Button';
import { FaAngleDown } from 'react-icons/fa';

const AppNavigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const navigate = useNavigate();
  const avatarImage = useSelector((state) => state?.user?.avatarImage);
  // const handleNavigateToDashboard = () => {
  //   navigate('/dashboard');
  // };
  const handleLogoDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <nav className="app-navbar-container">
        <span className="nav-items">
          <div className="app-nav-title">
            <span>
              <strong>Welcome Caribou</strong>
            </span>
          </div>
          <div className="app-flex" onClick={handleLogoDropdown}>
            <div className="image-wrapper">
              <img src={avatarImage} alt="Avatar image" />
            </div>
            <FaAngleDown />
            {dropdownOpen && (
              <div className="app-dash-dropdown">
                <button className="button dropdown-bg-btn">Logout</button>
              </div>
            )}
          </div>
        </span>
      </nav>
    </>
  );
};

export default AppNavigation;
