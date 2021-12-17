import React, { useState } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Button } from '@mui/material';

import TypeOfCustomer from './CustomerInfo/TypeOfCustomer';
import Preferences from './CustomerInfo/Preferences';
import TimePicker from './Order/TimePicker';

const SubmitButton = styled(Button)({
  background: 'black',
  color: '#F1C70F',
  '&:hover': {
    background: '#8931FE',
  },
});

const Order = (props) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label='Customer Info' />
            <Tab label='Order' />
            <Tab label='Menu' />
          </Tabs>
        </Box>
        {value === 0 && (
          <>
            <Box
              component='form'
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TypeOfCustomer />
              <Preferences />
              <SubmitButton>Submit</SubmitButton>
            </Box>
          </>
        )}
        {value === 1 && (
          <>
            <Box
              component='form'
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TimePicker />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default connect(null, null)(Order);
