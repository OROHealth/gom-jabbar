import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Services
import { authService } from '@services/api/auth/auth.service';
import { mapService } from '@services/api/map/map.service';

// components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';
import { addLocationToMap } from '@redux/reducers/map/map.reducer';

const defaultFormFields = {
  signalLocation: '',
  range: 0,
};

const MapFormSpotHuman = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { signalLocation, range } = formFields;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { signalLocation, range } = formFields;
    console.log('submited', range);
    try {
      const result = await mapService.saveLocation({
        signalLocation,
        range,
      });

      const result2 = await authService.signIn({
        email: 'giovanni',
        password: '123456',
      });

      console.log('Result:', result, result2, 'MapFormSpotHuman');
    } catch (error) {
      console.log('Error Posting:', error, 'MapFormSpot');
    }
    setLoading(true);
    resetFormFields();
    dispatch(addLocationToMap({ range, location: signalLocation }));
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2 style={{ fontSize: 17, color: '#de106f', fontWeight: 900 }}> Did you spot a human?</h2>
        <label htmlFor="human-presence">Signal the presence of humans.</label>
        <FormInput
          id="human-presence"
          label="Give a location.."
          type="text"
          required
          onChange={handleFormInputChange}
          name="signalLocation"
          value={signalLocation}
        />
        <label htmlFor="range">Trashing Level </label>
        <input
          id="range"
          type="range"
          name="range"
          min="0"
          max="25"
          step="1"
          onChange={handleFormInputChange}
          value={range}
          list="markers"
        />
        <datalist id="markers">
          <option value="0"></option>
          <option value="5"></option>
          <option value="10"></option>
          <option value="15"></option>
          <option value="20"></option>
          <option value="25"></option>
        </datalist>
        <div style={{ fontSize: 20, color: '#de006f' }}>{range}</div>
        <div className="loading-button">
          <Button type="submit">{loading ? <ReactSpinner /> : `Adding to the map`}</Button>
        </div>
      </form>
    </>
  );
};

export default MapFormSpotHuman;
