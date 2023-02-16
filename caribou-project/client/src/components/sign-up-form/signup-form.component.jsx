import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@services/api/auth/auth.service';
import { avatarColor, generateAvatar } from '@services/helpers/helpers';
import { useDispatch } from 'react-redux';

// import { LoadingContext } from '../../contexts/loading.context';

// styleSheet
import '@components/sign-up-form/signup-form.styles.scss';

// Components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';
import useLocalStorage from '@hooks/useLocalStorage';
import { addUser } from '@redux/reducers/user/user.reducer';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;
  //  Loading SVG State
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const [setStorageAccessToken] = useLocalStorage('access-token', 'set');
  const [setStorageRefreshToken] = useLocalStorage('refresh-token', 'set');
  const [setStorageLoggedIn] = useLocalStorage('loggedIn', 'set');
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
      error.push('Passwords do not match. Wrong password.');
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessages([error]);
      setLoading(false);
      return;
    }

    // Create the authenticated user with email and password. that we destructured off of our form fields.
    // this automatically logs in the user once signed up by default
    try {
      // Create avatarColor
      // create avatar Image
      // console.log('Registering', email, password);
      const color = avatarColor();
      const avatarImage = generateAvatar(email.charAt(0).toUpperCase(), color);
      const result = await authService.signUp({
        email,
        password,
        avatarImage,
      });

      console.log('Result that the server sent back:', result);
      const errorMsg = result.data[0]?.errorMsg;
      if (errorMsg) {
        setAlertType('alert-error');
        setLoading(false);
        setHasError(true);
        return setErrorMessages([errorMsg]);
      }

      // set logged in to true in local storage
      setStorageLoggedIn(true);
      // save/dispatch the user to Redis
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken;
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
      setHasError(true);
      setErrorMessages([]);
      // set success Messages
      const successMsg = result.data?.success[0]?.successMsg;
      setSuccessMessages([successMsg]);
      // clear fields
      resetFormFields();
      setLoading(false);
      if (!hasError) {
        navigate('/dashboard');
      }
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log('Error Registering the user.', 'Error Code:', errorCode, 'Error Message:', errorMessage);
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Don&apos;t have an account?</h2>
        <span>
          <strong style={{ color: '#de006f' }}>Sign up</strong> with your email and password
        </span>
        {hasError && errorMessages && successMessages && (
          <div className={`alerts ${alertType}`} role="alert">
            {errorMessages}
            {successMessages}
          </div>
        )}
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
