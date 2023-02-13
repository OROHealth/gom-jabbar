import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authService } from '@services/api/auth/auth.service';
import { UtilsService } from '@services/utils/utils.service';

// components
import Input from '@components/input/Input';
import Button from '@components/button/Button';

// stylesheet
import './Register.scss';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [setStoredUsername] = useLocalStorage('username', 'set'); // set username in storage
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set'); // set username in storage
  const [pageReload] = useSessionStorage('pageReload', 'set');
  const dispatch = useDispatch();

  console.log(username);

  const handleRegisterUser = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      // generate the user profile photo.
      const avatarColor = UtilsService.avatarColor();
      const avatarImage = UtilsService.generateAvatar(username.charAt(0).toUpperCase(), avatarColor());
      // Post request to signup endpoint
      const result = await authService.signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage,
      });
      setLoggedIn(true); // set logged in to true in local storage
      setStoredUsername(username); // save the username to local storage
      UtilsService.dispatchUser(result, pageReload, dispatch, setUser); // to dispatch a user
      setHasError(false);
      setAlertType('alert-success'); // dynamically set css alert color
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error'); // css color for the error alert
      setErrorMessage(error?.response?.data.message);
    }
  };

  useEffect(() => {
    // if it's still loading and there is no user, return don't do further
    if (loading && !user) return;

    // if there is a user, signup is sucessfull redirect to main page
    if (user) {
      // if successfully loggedin, redirecct user
      return navigate('/app/social/streams');
    }
  }, [setLoading, loading, user]);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          Error message
        </div>
      )}
      <form className="auth-form" onSubmit={handleRegisterUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter Username"
            // className={``}
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            labelText="Email"
            placeholder="Enter Email"
            // className={``}
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            // className={``}
            style={{ border: `${hasError ? '1px solid #fa9b8a' : ''}` }}
            handleChange={(event) => setPassword(event.target.value)}
          />
          {/* password field */}
        </div>
        {/* button component */}

        <Button
          label={`${loading ? 'SIGNUP IN PROGRESS...' : 'SIGNUP'}`}
          className="auth-button button"
          disabled={!username || !email || !password}
        ></Button>
      </form>
    </div>
  );
};

export default Register;
