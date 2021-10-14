import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, FormControl } from '@mui/material';
import EarningRatings from './earnings_ratings';
import DrinksEvolution from './drinks_evolution';
import MoiraEvolution from './moira_mocktails';
import Search from './search_out_of_town';

import {
  fetchFeedback,
  fetchOrder,
  fetchCustomers,
} from '../../store/utils/thunkCreators';

function Analytics(props) {
  const { fetchFeedback, fetchOrder, fetchCustomers } = props;

  useEffect(() => {
    fetchFeedback();
    fetchOrder();
    fetchCustomers();
  }, [fetchFeedback, fetchOrder, fetchCustomers]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '50%',
          margin: '100px auto 0',
          gap: '10px',
        }}
      >
        <FormControl>
          <EarningRatings />
        </FormControl>
        <FormControl>
          <DrinksEvolution />
        </FormControl>
        <FormControl>
          <MoiraEvolution />
        </FormControl>
        <FormControl>
          <Search />
        </FormControl>
      </Box>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeedback: () => {
      dispatch(fetchFeedback());
    },
    fetchOrder: () => {
      dispatch(fetchOrder());
    },
    fetchCustomers: () => {
      dispatch(fetchCustomers());
    },
  };
};

export default connect(null, mapDispatchToProps)(Analytics);
