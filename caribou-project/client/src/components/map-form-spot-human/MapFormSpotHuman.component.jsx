import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Services
import { mapService } from '@services/api/map/map.service';

// components
import FormInput from '@components/form-input/formInput.component';
import Button from '@components/button/Button';
import ReactSpinner from '@components/react-spinner/react-spinner.component';
import { removeMap } from '@redux/reducers/map/map.reducer';
// import { addLocationsFound } from '@redux/reducers/locationsFound/locationsFound.reducer';

const defaultFormFields = {
  labelName: '',
  trashingLevel: 5,
  excitementLevel: 5,
};

const MapFormSpotHuman = () => {
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  let { trashingLevel, excitementLevel, labelName } = formFields;
  const [alertType, setAlertType] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [hasMsg, setHasMsg] = useState(false);
  const dispatch = useDispatch();
  const labelNameState = useSelector((state) => state?.map?.label);
  const xName = useSelector((state) => state.map?.x);
  const yName = useSelector((state) => state.map?.y);
  if (labelNameState) labelName = labelNameState;

  const timeLimitMessage = () => {
    setTimeout(() => {
      setHasMsg(false);
    }, 15000);
  };

  const resetFormFields = () => {
    // Sets the form to it's initial state in the original object.
    setFormFields(defaultFormFields);
  };

  // Input Change
  const handleFormInputChange = async (event) => {
    setHasMsg(false);
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
      timeLimitMessage();
      setLoading(false);
      return setErrorMessages(['Please select the location on the map first to accurately save the coordinates.']);
    }
    if (labelName !== labelNameState) {
      setAlertType('alert-error');
      setHasMsg(true);
      timeLimitMessage();
      setLoading(false);
      return setErrorMessages(['Name of location does not match']);
    }

    try {
      // save location in database
      // console.log('Line 75: Saving location in database', 'MapFormSpotHuman');
      await mapService
        .saveLocation({
          excitementLevel,
          trashingLevel,
          labelName,
          xName,
          yName,
        })
        .then((result) => {
          if (result.data) {
            // console.log('Line 86: Result:', result, 'MapFormSpotHuman');
            if (result?.data?.errorMsg) {
              setHasMsg(true);
              timeLimitMessage();
              setAlertType('alert-error');
              setLoading(false);
              return setErrorMessages([result?.data?.errorMsg]);
            }

            if (hasMsg) {
              labelName = '';
            }

            dispatch(removeMap());
            // dispatch(addLocationsFound([{ excitementLevel, trashingLevel, labelName, xName, yName }]));
            setHasMsg(true);
            timeLimitMessage(); // deactivates the message at this time
            setErrorMessages([]);
            setAlertType('alert-success');
            setSuccessMessages(['Location added successfully']);
            setLoading(false);
            resetFormFields();
            // dispatch(addLocationToMap({ trashingLevel, x: xName, y: yName, label: labelName }));
            setLoading(false);
          }
        });
    } catch (error) {
      console.log('Error Posting:', error?.response?.data[0]?.errorMsg, 'error:', error, 'MapFormSpot');
      setSuccessMessages([]);
      setHasMsg(true);
      timeLimitMessage();
      setAlertType('alert-error');
      setLoading(false);
      setErrorMessages([error?.response?.data[0]?.errorMsg || error?.response?.data?.message || error?.message]);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            <h2 style={{ fontSize: 20, color: '#de106f', fontWeight: 900 }}> Did you spot a human?</h2>
            <label htmlFor="human-presence">Find the area on the map then save it here &#x2714;</label>
            {hasMsg && errorMessages && successMessages && (
              <div className={`alerts ${alertType}`} role="alert">
                {errorMessages}
                {successMessages}
              </div>
            )}
          </div>
          <div>
            <FormInput
              id="human-presence"
              label="Give a location.."
              type="text"
              required
              onChange={handleFormInputChange}
              name="labelName"
              value={labelName}
            />
          </div>
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
        </div>
        <div className="loading-button">
          <Button type="submit">{loading ? <ReactSpinner /> : `Save to the map`}</Button>
        </div>
      </form>
    </>
  );
};

export default MapFormSpotHuman;
