import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { LoadingContext } from '../../contexts/loading.context';

// styleSheet
import '@components/sign-up-form/signup-form.component';

// Components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';

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
  const navigate = useNavigate();

  const resetFormFields = () => {
    // Sets the form to it's initial state in the original object.
    setFormFields(defaultFormFields);
  };

  const handleFormInputChange = async (event) => {
    const { name, value } = event.target;
    const formInput = { ...formFields, [name]: value };

    setFormFields(formInput);
    console.log(formInput);
  };

  //
  //
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // [] confirm that the password matches
    if (password !== confirmPassword) {
      alert('Passwords do not match. Wrong password.');
      return;
    }

    // Create the authenticated user with email and password. that we destructured off of our form fields.
    // this automatically logs in the user once signed up by default
    try {
      resetFormFields();

      setLoading(false);
      navigate('/dashboard');
      //
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      // console.log('Error creating the user', errorCode, errorMessage)
      console.log('Error creating the user.', 'Error Code:', errorCode, 'Error Message:', errorMessage);
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <h2>Don&apos;t have an account?</h2>
        <span>Sign up with your email and password</span>
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
