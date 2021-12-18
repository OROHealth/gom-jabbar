import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Button, TextField } from '@mui/material';

import TypeOfCustomer from './TypeOfCustomer';
import Preferences from './Preferences';

const SubmitButton = styled(Button)({
  background: 'black',
  color: '#F1C70F',
  '&:hover': {
    background: '#8931FE',
  },
  marginBottom: '50px',
});

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  maxWidth: '800px',
  margin: '0 auto',
};

const CustomerInfo = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [food, setFood] = useState('');
  const [drink, setDrink] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  function logs(e) {
    e.preventDefault();
    console.log(type, food, drink);
  }

  return (
    <>
      <Box component='form' sx={boxStyle}>
        <button onClick={logs}>logs</button>
        <TextField
          fullWidth
          id='filled-basic'
          label='Customer name'
          variant='filled'
          onChange={handleChange}
        />
        <TypeOfCustomer setType={setType} />
        <Preferences
          food={food}
          setFood={setFood}
          drink={drink}
          setDrink={setDrink}
        />
        <SubmitButton>Submit</SubmitButton>
      </Box>
    </>
  );
};
export default CustomerInfo;
