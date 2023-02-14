import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//  StyleSheet
import './sign-in-form.styles.scss';

// Components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';

const defaultSignInFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // State
  const [inputFields, setInputFields] = useState(defaultSignInFields);

  //  Loading SVG State
  const [loading, setLoading] = useState(false);

  const { email, password } = inputFields;
  const navigate = useNavigate();

  const handleSignInInputChange = (event) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
    console.log(inputFields);
  };

  const resetFormFields = () => {
    setInputFields(defaultSignInFields);
  };

  const handleLoginWithEmailAndPasswordOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      resetFormFields();

      setLoading(false);
      navigate('/dashboard');
      //
    } catch (error) {
      //
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('User email not found.');
          break;
        default:
          console.log('Error signing in user.', 'Error Code:', errorCode, 'Error Message:', errorMessage);
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      // setLoading(false);
      //  populate the user into redux
    };

    getUser();
  }, [navigate, setLoading]);

  return (
    <>
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
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
