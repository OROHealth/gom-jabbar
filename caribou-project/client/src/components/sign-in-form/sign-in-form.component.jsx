import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '@redux/reducers/user/user.reducer';

//  StyleSheet
import './sign-in-form.styles.scss';

// Components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';
import { authService } from '@services/api/auth/auth.service';

// local Storage
import useLocalStorage from '@hooks/useLocalStorage';

const defaultSignInFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // State
  const [inputFields, setInputFields] = useState(defaultSignInFields);
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [hasMsg, setHasMsg] = useState(false);
  const [setStorageAccessToken] = useLocalStorage('access-token', 'set');
  const [setStorageRefreshToken] = useLocalStorage('refresh-token', 'set');
  const [setStorageLoggedIn] = useLocalStorage('loggedIn', 'set');
  const dispatch = useDispatch();

  const { email, password } = inputFields;
  const navigate = useNavigate();

  const handleSignInInputChange = (event) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
    // console.log(inputFields);
  };

  const resetFormFields = () => {
    setInputFields(defaultSignInFields);
  };

  const handleLoginWithEmailAndPasswordOnSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      resetFormFields();
      // console.log('Logging In', email, password);
      const result = await authService.signIn({
        email,
        password,
      });

      const errorMsg = result.data[0]?.errorMsg;
      if (errorMsg) {
        setAlertType('alert-error');
        setLoading(false);
        setHasMsg(true);
        return setErrorMessages([errorMsg]);
      }

      // console.log('result:', result);
      // set logged in to true in local storage
      setStorageLoggedIn(true);
      // save/dispatch the user to Redis
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken;
      const avatarImage = result.data.avatarImage;
      dispatch(
        addUser({
          refreshToken,
          accessToken,
          avatarImage,
        })
      );
      // save the token and refresh token to local storage
      setStorageAccessToken(accessToken);
      setStorageRefreshToken(refreshToken);

      setAlertType('alert-success');
      setHasMsg(true);
      setErrorMessages([]);
      // set success Messages
      const successMsg = result.data?.success[0]?.successMsg;
      setSuccessMessages([successMsg]);
      resetFormFields();
      setLoading(false);
      navigate('/dashboard');

      //
    } catch (error) {
      //
      setLoading(false);
      setHasMsg(true);
      setAlertType('alert-error');
      const errorCode = error.code;
      const errorMessage = error.message;

      if (error) {
        console.log('Error Logging in the user.', 'Error Code:', errorCode, 'Error Message:', errorMessage);
      }
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>
          <strong style={{ color: '#de006f' }}>Sign in</strong> with your email and password
        </span>
        {hasMsg ||
          (errorMessages.length > 0 && successMessages && (
            <div className={`alerts ${alertType}`} role="alert">
              {errorMessages}
              {successMessages}
            </div>
          ))}
        <form onSubmit={handleLoginWithEmailAndPasswordOnSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleSignInInputChange}
            name="email"
            value={email}
          />
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleSignInInputChange}
            name="password"
            value={password}
          />
          <div className="loading-button">
            <Button type="submit">{loading ? <ReactSpinner /> : `Sign In`}</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
