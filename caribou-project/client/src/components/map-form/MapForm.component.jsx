import React, { useState } from 'react';

// components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';

const defaultFormFields = {
  password: '',
};

const MapForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password } = formFields;
  const [loading, setLoading] = useState(false);

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

  const handleFormSubmit = () => {
    setLoading(true);
    resetFormFields();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleFormInputChange}
          name="password"
          value={password}
        />
        <div className="loading-button">
          <Button type="submit">{loading ? <ReactSpinner /> : `Sign Up`}</Button>
        </div>
      </form>
    </>
  );
};

export default MapForm;
