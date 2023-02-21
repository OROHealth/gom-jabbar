import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '@redux/reducers/user/user.reducer';

//  StyleSheet
import '@components/sign-in-form/sign-in-form.styles.scss';

// Components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';

// Services
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
  const { email, password } = inputFields;
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [setStorageAccessToken] = useLocalStorage('access-token', 'set');
  const [setStorageRefreshToken] = useLocalStorage('refresh-token', 'set');
  const [setStorageLoggedIn] = useLocalStorage('loggedIn', 'set');
  const [setStorageEmail] = useLocalStorage('app-email', 'set');
  const [setStorageAvatarImage] = useLocalStorage('avatar-image', 'set');
  const dispatch = useDispatch();

  // Navigate User
  const navigate = useNavigate();

  // Input Form Fields
  const handleSignInInputChange = (event) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
    // console.log(inputFields);
  };

  // reset Form Fields
  const resetFormFields = () => {
    setInputFields(defaultSignInFields);
  };

  // Submit Sign In Form
  const handleLoginWithEmailAndPasswordOnSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { email, password } = inputFields;
    console.log(`Line 61: Logging in the User ${email} ${password}, Sign-in-form`);

    try {
      // Post Request to the Server
      await authService
        .signIn({
          email,
          password,
        })
        .then((result) => {
          console.log(`Line 69: Logging in the User ${result}, Sign-in-form`);
          console.log('result:', result);
          // set logged in to true in local storage
          if (result.helllo) {
            // save/dispatch the user to Redis
            const accessToken = result.data.accessToken;
            const refreshToken = result.data.refreshToken;
            const avatarImage = result.data.avatarImage;
            const email = result.data.email;
            dispatch(
              addUser({
                refreshToken,
                accessToken,
                avatarImage,
                loggedIn: true,
                email,
              })
            );

            resetFormFields();
            // save the token and refresh token to local storage
            setStorageAccessToken(accessToken);
            setStorageRefreshToken(refreshToken);
            setStorageAvatarImage(avatarImage);
            setStorageEmail(email);
            setStorageLoggedIn(true);

            setShowErrorMsg(false);
            setShowSuccessMsg(true);
            // set success Messages

            setLoading(false);
            const successMsg = result?.data?.success[0]?.successMsg;
            setSuccessMessages([successMsg]);
            resetFormFields();
          }
        });
      //
    } catch (error) {
      //
      setLoading(false);
      setShowSuccessMsg(false);
      setShowErrorMsg(true);
      const errorCode = error?.code;
      const errorMessage = error?.message;

      console.log(
        'Line 117: Sign-in -> Error Logging in the user.',
        'Error Code:',
        errorCode,
        'Error Message:',
        errorMessage,
        'Error',
        error
      );
      setErrorMessages([error?.response?.data[0]?.errorMsg || error?.message || error?.response?.data?.message]);
    }
    navigate('/app/dashboard');
  };

  return (
    <>
      <div className="sign-up-container sign-in-container-edit">
        <h2>Already have an account?</h2>
        <span>
          <strong style={{ color: '#de006f' }}>Sign in</strong> with your email and password
        </span>
        <div>
          {showSuccessMsg && successMessages && (
            <div className={`alerts alert-success`} role="alert">
              {successMessages}
            </div>
          )}
          {showErrorMsg && errorMessages && (
            <div className={`alerts alert-error`} role="alert">
              {errorMessages}
            </div>
          )}
        </div>

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
