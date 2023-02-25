import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@services/api/auth/auth.service';
import { avatarColor, generateAvatar } from '@services/helpers/helpers';
import { useDispatch } from 'react-redux';

// styleSheet
import '@components/sign-up-form/signup-form.styles.scss';

// Components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';
import useLocalStorage from '@hooks/useLocalStorage';
import { addUser, removeUser } from '@redux/reducers/user/user.reducer';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;
  //  State
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const navigate = useNavigate();
  const [setStorageAccessToken] = useLocalStorage('access-token', 'set');
  const [setStorageRefreshToken] = useLocalStorage('refresh-token', 'set');
  const [setStorageAvatarImage] = useLocalStorage('avatar-image', 'set');
  const [setStorageEmail] = useLocalStorage('app-email', 'set');
  const [setStorageLoggedIn] = useLocalStorage('loggedIn', 'set');
  const deleteStorageEmail = useLocalStorage('app-email', 'delete');
  const deleteStorageAccessToken = useLocalStorage('access-token', 'delete');
  const deleteStorageRefreshToken = useLocalStorage('refresh-token', 'delete');
  const deleteStorageAvatarImage = useLocalStorage('avatar-image', 'delete');
  const dispatch = useDispatch();

  const timeLimitMessage = () => {
    setTimeout(() => {
      setShowSuccessMsg(false);
      setShowErrorMsg(false);
    }, 15000);
  };

  // Sets the form to it's initial state in the original object.
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handle input fields
  const handleFormInputChange = async (event) => {
    const { name, value } = event.target;
    const formInput = { ...formFields, [name]: value };
    setFormFields(formInput);
    // console.log(formInput);
  };

  // Handle Form submission
  const handleFormSubmit = async (event) => {
    const { email, password, confirmPassword } = formFields;
    setLoading(true);
    event.preventDefault();

    const error = [];

    // Confirm that the passwords matches
    if (password !== confirmPassword) {
      error.push('Passwords do not match. Try again.');
      setShowSuccessMsg(false);
      setLoading(false);
      setShowErrorMsg(true);
      setErrorMessages([error]);
      timeLimitMessage();
      return;
    }

    // Check that passwords are at least 6 characters
    if (password.length < 6) {
      setLoading(false);
      setShowSuccessMsg(false);
      setShowErrorMsg(true);
      timeLimitMessage();
      setErrorMessages(['Password must be at least 6 characters']);
      return;
    }

    try {
      // console.log('Line 94: Registering User, signUp-form-client');

      // Create avatarColor
      const color = avatarColor();

      // Create avatar Image
      const avatarImage = generateAvatar(email.charAt(0).toUpperCase(), color);

      // Signing up caribou
      await authService
        .signUp({
          email,
          password,
          avatarImage,
          loggedIn: true,
        })
        .then((savedUser) => {
          // console.log('Line 108: Result of the request:', savedUser, 'signup form component');
          if (savedUser.data) {
            // clear fields
            resetFormFields();
            const accessToken = savedUser.data.accessToken;
            const refreshToken = savedUser.data.refreshToken;
            const avatarImage = savedUser.data.avatarImage;
            const email = savedUser.data.email;
            // console.log(email, accessToken, refreshToken, avatarImage);
            dispatch(
              addUser({
                refreshToken,
                accessToken,
                avatarImage,
                email,
              })
            );
            // console.log('Line 125: Result that the server sent back:', savedUser);
            // save/dispatch the user to Redis
            // save the token and refresh token to local storage
            setLoading(false);
            setShowErrorMsg(false);
            const successMsg = savedUser?.data?.success[0]?.successMsg;
            setSuccessMessages([successMsg]);
            setShowSuccessMsg(true);

            setStorageAccessToken(accessToken);
            setStorageRefreshToken(refreshToken);
            setStorageEmail(email);
            setStorageAvatarImage(avatarImage); // set avatarImage in local storage
            setStorageLoggedIn(true); // set logged in to true in local storage
            navigate('/app/dashboard');
          }
        });
    } catch (error) {
      setShowSuccessMsg(false);
      setLoading(false);
      setShowErrorMsg(true);
      setErrorMessages([error?.response?.data[0]?.errorMsg || error?.message]);
      timeLimitMessage();
      const errorCode = error.code;
      const errorMessage = error.message;

      // If error, Reset the State, and navigate the user to the home page.
      dispatch(removeUser());
      deleteStorageAccessToken();
      deleteStorageRefreshToken();
      deleteStorageAvatarImage();
      deleteStorageEmail();
      setStorageLoggedIn(false);

      console.log(
        'Line 160: Error Registering the user.',
        'Error Code:',
        errorCode,
        'Error Message:',
        errorMessage,
        error,
        'SignUp Form Component'
      );
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Don&apos;t have an account?</h2>
        <span>
          <strong style={{ color: '#de006f' }}>Sign up</strong> with your email and password
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
        <form onSubmit={handleFormSubmit}>
          {/* // required makes sure the input is not empty */}
          <FormInput label="Email" type="email" required onChange={handleFormInputChange} name="email" value={email} />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleFormInputChange}
            name="password"
            value={password}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={handleFormInputChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <div className="loading-button">
            <Button type="submit">{loading ? <ReactSpinner /> : `Sign Up`}</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
