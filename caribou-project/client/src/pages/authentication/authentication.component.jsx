import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// stylesheet
import './authentication.component.scss';

// components
import SignUpForm from '@components/sign-up-form/signup-form.component';
import SignInForm from '@components/sign-in-form/sign-in-form.component';
import HomeNavigation from '@components/home-navigation/HomeNavigation.components';
import useLocalStorage from '@hooks/useLocalStorage';

const Authentication = () => {
  const loggedIn = useLocalStorage('loggedIn', 'get');
  const navigate = useNavigate();

  useEffect(() => {
    const resWithTimeout = setTimeout(() => {
      if (loggedIn) {
        navigate('/app/dashboard');
      }
    }, 500);

    clearTimeout(resWithTimeout);
  }, [navigate, loggedIn]);

  return (
    <>
      <HomeNavigation />
      <div className="authentication-container ">
        <div className="auth-wrapper ">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default Authentication;
