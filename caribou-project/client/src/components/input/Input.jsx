import React from 'react';

const Input = (props) => {
  const { labelText = 'Email', ...rest } = props;
  return <input {...rest}>{labelText}</input>;
};

export default Input;
