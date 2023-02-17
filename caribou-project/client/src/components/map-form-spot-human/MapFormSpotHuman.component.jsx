import React, { useState } from 'react';

// components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';

const defaultFormFields = {
  signalPresence: '',
};

const MapFormSpotHuman = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [trashingRange, setTrashingRange] = useState(0);
  const { signalPresence } = formFields;
  const [loading, setLoading] = useState(false);

  const resetFormFields = () => {
    // Sets the form to it's initial state in the original object.
    setFormFields(defaultFormFields);
  };

  // Input Change
  const handleFormInputChange = async (event) => {
    const { name, value } = event.target;
    const formInput = { ...formFields, [name]: value };

    setFormFields(formInput);
    // console.log(formInput);
  };

  const handleRangeChange = async (event) => {
    console.log(event.target.value);
    const range = event.target.value;
    setTrashingRange(range);
  };

  const handleFormSubmit = () => {
    setLoading(true);
    resetFormFields();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2> Did you spot a human?</h2>
        <FormInput
          label="Signal the presence of a human"
          type="text"
          required
          onChange={handleFormInputChange}
          name="signalPresence"
          value={signalPresence}
        />
        <label htmlFor="range">Trashing Level: </label>
        <input
          id="range"
          type="range"
          name="Trashing Level"
          min="0"
          max="25"
          step="1"
          onChange={handleRangeChange}
          value={trashingRange}
        />
        <div>{trashingRange}</div>
        <div className="loading-button">
          <Button type="submit">{loading ? <ReactSpinner /> : `Adding to the map`}</Button>
        </div>
      </form>
    </>
  );
};

export default MapFormSpotHuman;
