import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Services
import { mapService } from '@services/api/map/map.service';

// components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';
// import { addLocationToMap } from '@redux/reducers/map/map.reducer';
// Map
// import { GoogleProvider, GeoSearchControl } from 'leaflet-geosearch';
// import { provider, searchControl } from '@components/map/map.component';

const defaultFormFields = {
  labelName: '',
  trashingLevel: 0,
  excitementLevel: 0,
};

const MapFormSpotHuman = () => {
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  let { trashingLevel, excitementLevel, labelName } = formFields;
  const [alertType, setAlertType] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [hasMsg, setHasMsg] = useState(false);
  // const dispatch = useDispatch();
  const labelNameState = useSelector((state) => state?.map?.label);
  const xName = useSelector((state) => state.map?.x);
  const yName = useSelector((state) => state.map?.y);
  if (labelNameState) labelName = labelNameState;

  const resetFormFields = () => {
    // Sets the form to it's initial state in the original object.
    setFormFields(defaultFormFields);
  };

  // Input Change
  const handleFormInputChange = async (event) => {
    const { name, value } = event.target;
    const formInput = { ...formFields, [name]: value };

    setFormFields(formInput);
    // console.log(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!labelNameState) {
      setAlertType('alert-error');
      setHasMsg(true);
      setLoading(false);
      return setErrorMessages(['Please select the location on the map first to accurately save the coordinates.']);
    }
    if (labelName !== labelNameState) {
      setAlertType('alert-error');
      setHasMsg(true);
      setLoading(false);
      return setErrorMessages(['Name of location does not match']);
    }
    // const { trashingLevel, labelName } = formFields;
    console.log('submited', trashingLevel);
    console.log('submited', labelName);
    console.log('submited', xName);
    console.log('submited', yName);

    try {
      // save location in database
      const result = await mapService.saveLocation({
        excitementLevel,
        trashingLevel,
        labelName,
        xName,
        yName,
      });

      console.log('Result:', result, 'MapFormSpotHuman');
      setHasMsg(true);
      setErrorMessages([]);
      setAlertType('alert-success');
      setSuccessMessages(['Location added successfully']);
      setLoading(false);
      resetFormFields();
      // dispatch(addLocationToMap({ trashingLevel, x: xName, y: yName, label: labelName }));
      setLoading(false);
    } catch (error) {
      console.log('Error Posting:', error, 'MapFormSpot');
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h2 style={{ fontSize: 17, color: '#de106f', fontWeight: 900 }}> Did you spot a human?</h2>
        <label htmlFor="human-presence">Find the area on the map then save it here &#x2714;</label>
        {hasMsg && errorMessages && successMessages && (
          <div className={`alerts ${alertType}`} role="alert">
            {errorMessages}
            {successMessages}
          </div>
        )}
        <FormInput
          id="human-presence"
          label="Give a location.."
          type="text"
          required
          onChange={handleFormInputChange}
          name="labelName"
          value={labelName}
        />
        <label htmlFor="trashingLevel">Trashing Level </label>
        <input
          id="trashingLevel"
          type="range"
          name="trashingLevel"
          min="5"
          max="30"
          step="1"
          onChange={handleFormInputChange}
          value={trashingLevel}
          list="markers"
        />
        <datalist id="markers">
          <option value="5"></option>
          <option value="10"></option>
          <option value="15"></option>
          <option value="20"></option>
          <option value="25"></option>
          <option value="30"></option>
        </datalist>
        <div style={{ fontSize: 20, color: '#de006f' }}>{trashingLevel}</div>
        <label htmlFor="range">Excitement Level </label>
        <input
          id="excitementLevel"
          type="range"
          name="excitementLevel"
          min="5"
          max="30"
          step="1"
          onChange={handleFormInputChange}
          value={excitementLevel}
          list="markers"
        />
        <datalist id="markers">
          <option value="5"></option>
          <option value="10"></option>
          <option value="15"></option>
          <option value="20"></option>
          <option value="25"></option>
          <option value="30"></option>
        </datalist>
        <div style={{ fontSize: 20, color: '#de006f' }}>{excitementLevel}</div>
        <div className="loading-button">
          <Button type="submit">{loading ? <ReactSpinner /> : `Save to the map`}</Button>
        </div>
      </form>
    </>
  );
};

export default MapFormSpotHuman;
