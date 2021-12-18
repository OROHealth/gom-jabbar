import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Box } from '@mui/material';

import CustomerInfo from './CustomerInfo/index';
import Order from './Order/index';
import Menu from './Menu/index';

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
      {value === 0 && <CustomerInfo />}
      {value === 1 && <Order />}
      {value === 2 && <Menu />}
    </>
  );
};

export default connect(null, null)(OrderTabs);
