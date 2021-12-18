import React, { useState } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Button } from '@mui/material';

import TypeOfCustomer from './CustomerInfo/TypeOfCustomer';
import Preferences from './CustomerInfo/Preferences';
import Order from './Order/index';
import Menu from './Menu/index';

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

const OrderTabs = (props) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', mt: 4, mb: 5 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Customer Info' />
          <Tab label='Order' />
          <Tab label='Menu' />
        </Tabs>
      </Box>
      {value === 0 && (
        <>
          <Box component='form' sx={boxStyle}>
            <TypeOfCustomer />
            <Preferences />
            <SubmitButton>Submit</SubmitButton>
          </Box>
        </>
      )}
      {value === 1 && <Order />}
      {value === 2 && <Menu />}
    </>
  );
};

export default connect(null, null)(OrderTabs);
