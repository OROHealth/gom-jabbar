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
  const [alertType, setAlertType] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const [setStorageAccessToken] = useLocalStorage('access-token', 'set');
  const [setStorageRefreshToken] = useLocalStorage('refresh-token', 'set');
  const [setStorageAvatarImage] = useLocalStorage('avatar-image', 'set');
  const [setStorageLoggedIn] = useLocalStorage('loggedIn', 'set');
  const deleteStorageAccessToken = useLocalStorage('access-token', 'delete');
  const deleteStorageRefreshToken = useLocalStorage('refresh-token', 'delete');
  const deleteStorageAvatarImage = useLocalStorage('avatar-image', 'delete');
  const dispatch = useDispatch();

  const resetFormFields = () => {
    // Sets the form to it's initial state in the original object.
    setFormFields(defaultFormFields);
  };

  const handleFormInputChange = async (event) => {
    const { name, value } = event.target;
    const formInput = { ...formFields, [name]: value };
    setFormFields(formInput);
    // console.log(formInput);
  };

  //
  //
  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const error = [];

    // [] confirm that the password matches
    if (password !== confirmPassword) {
      error.push('Passwords do not match. Try again.');
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessages([error]);
      setLoading(false);
      return;
    }

    // Create the authenticated user with email and password that was destructured to get the specific form fields.
    // this automatically logs in the user once signed up by default
    try {
      // Create avatarColor
      // Create avatar Image

      console.log('Line 74: Registering User, signUp-form-client');
      const color = avatarColor();
      const avatarImage = generateAvatar(email.charAt(0).toUpperCase(), color);
      await authService
        .signUp({
          email,
          password,
          avatarImage,
          loggedIn: true,
        })
        .then((savedUser) => {
          console.log('Line 88: Result of the request:', savedUser);

          const accessToken = savedUser.data.accessToken;
          const refreshToken = savedUser.data.refreshToken;
          const avatarImage = savedUser.data.avatarImage;
          dispatch(
            addUser({
              refreshToken,
              accessToken,
              avatarImage,
            })
          );

          console.log('Line 101: Result that the server sent back:', savedUser);

          // save/dispatch the user to Redis
          // save the token and refresh token to local storage
          setStorageAccessToken(accessToken);
          setStorageRefreshToken(refreshToken);
          setStorageAvatarImage(avatarImage); // set avatarImage in local storage
          setStorageLoggedIn(true); // set logged in to true in local storage

          setHasError(true);
          setErrorMessages([]);
          setAlertType('alert-success');
          // set success Messages
          const successMsg = savedUser?.data?.success[0]?.successMsg;
          setSuccessMessages([successMsg]);
          // clear fields
          resetFormFields();
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      const errorCode = error.code;
      const errorMessage = error.message;
      // if error, Reset the State, and navigate the user to the home page.
      dispatch(removeUser());
      deleteStorageAccessToken();
      deleteStorageRefreshToken();
      deleteStorageAvatarImage();
      setStorageLoggedIn(false);

      console.log(
        'Line 133: Error Registering the user.',
        'Error Code:',
        errorCode,
        'Error Message:',
        errorMessage,
        error
      );
      setErrorMessages([error?.response?.data[0]?.errorMsg || error?.message]);
      navigate('/');
    }
    navigate('/app/dashboard');
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Don&apos;t have an account?</h2>
        <span>
          <strong style={{ color: '#de006f' }}>Sign up</strong> with your email and password
        </span>
        <div>
          {hasError && errorMessages && successMessages && (
            <div className={`alerts ${alertType}`} role="alert">
              {errorMessages}
              {successMessages}
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
