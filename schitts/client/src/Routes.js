import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Order from './Components/Order/Order';
import MenuItems from './Components/MenuItems/MenuItems';
import Analytics from './Components/Analytics/Analytics';
import Customer from './Components/Customer/Customer';
import Feedback from './Components/Feedback/Feedback';

import { Box } from '@mui/material';

function Routes() {
  return (
    <>
      <Navbar />
      <Switch>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '100px',
          }}
        >
          <Route exact path='/' component={Customer} />
          <Route path='/menu' component={MenuItems} />
          <Route path='/analytics' component={Analytics} />
          <Route path='/order' component={Order} />
          <Route path='/feedback' component={Feedback} />
        </Box>
      </Switch>
    </>
  );
}

export default Routes;
