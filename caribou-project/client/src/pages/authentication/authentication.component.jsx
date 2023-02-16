// stylesheet
import './authentication.component.scss';
import { mapBoxApiKey } from '@services/utils/config';

// components
import SignUpForm from '@components/sign-up-form/signup-form.component';
import SignInForm from '@components/sign-in-form/sign-in-form.component';
import HomeNavigation from '@components/home-navigation/HomeNavigation.components';

const Authentication = () => {
  console.log(mapBoxApiKey);
  return (
    <>
      <HomeNavigation />
      <div className="authentication-container">
        <div className="auth-wrapper">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default Authentication;
