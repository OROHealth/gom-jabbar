import React from 'react';

// stylesheet
import './formInput.styles.scss';

const formInput = ({ label, ...rest }) => {
  return (
    <div className={`group ${rest.type === 'email' && 'form-home-email'}`}>
      {/*
    Render some string where the value is dependent on the rest of the props value.
    [] If the value of length is present. meaning that. If the user has typed something into this input. That means I want the label to shrink. otherwise don't do anything return an empty string.
     */}
      {label && <label className={`${rest.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>}
      <input className="form-input" {...rest} />
    </div>
  );
};

export default formInput;
