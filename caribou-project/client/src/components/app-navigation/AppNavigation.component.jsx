import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import useLocalStorage from '@hooks/useLocalStorage';

// stylesheet
import '@components/app-navigation/AppNavigation.styles.scss';

// Components
import { FaAngleDown } from 'react-icons/fa';
import { removeUser } from '@redux/reducers/user/user.reducer';

const AppNavigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteStorageAccessToken = useLocalStorage('access-token', 'delete');
  const deleteStorageRefreshToken = useLocalStorage('refresh-token', 'delete');
  const deleteStorageAvatarImage = useLocalStorage('avatar-image', 'delete');
  const deleteStorageEmail = useLocalStorage('app-email', 'delete');
  const [setStorageLoggedIn] = useLocalStorage('loggedIn', 'set');
  const avatarImage = useLocalStorage('avatar-image', 'get');
  const userImage = useSelector((state) => state?.user?.avatarImage);

  const handleLogoDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogOutUser = () => {
    try {
      dispatch(removeUser());
      deleteStorageAccessToken();
      deleteStorageRefreshToken();
      deleteStorageAvatarImage();
      deleteStorageEmail();
      setStorageLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="app-navbar-container">
        <span className="nav-items">
          <div onClick={() => navigate('/app/dashboard')} className="app-nav-title">
            <span>
              <strong>Welcome Caribou</strong>
            </span>
          </div>
          <div className="app-flex">
            <div onClick={handleLogoDropdown} className="app-flex">
              <div className="image-wrapper">
                <img src={userImage || avatarImage} alt="Avatar image" />{' '}
              </div>
              <FaAngleDown />
              {dropdownOpen && (
                <div className="app-dash-dropdown">
                  <span>We&apos;re sorry to see you go Caribou : &#40;</span>

                  <button className="button dropdown-bg-btn" onClick={handleLogOutUser}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </span>
      </nav>
    </>
  );
};

export default AppNavigation;
