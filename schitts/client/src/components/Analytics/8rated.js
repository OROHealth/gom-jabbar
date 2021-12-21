import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import axios from 'axios';

import Chart from './charts/canvasjs';

const Rated = (props) => {
  const { user } = props;
  const [ratedValues, setRatedValues] = useState({
    quantity: 0,
    totalEarnings: 0,
    medianRating: 0,
  });
  const [selectedUser, setSelectedUser] = useState('Twyla');

  useEffect(() => get8rated(selectedUser), [selectedUser]);

  async function get8rated(selectedUser) {
    const { data } = await axios.get(
      `/api/analytics/8rated-6months/${selectedUser}`
    );
    let qt = 0,
      tE = 0,
      rT = 0,
      mR = 0;

    for (let i = 0; i < data.orders_past_6months.length; i++) {
      qt += data.orders_past_6months[i].ratedMeals;
      tE += data.orders_past_6months[i].totalRatedEarnings;
      if (parseFloat(data.orders_past_6months[i].ratedRating) === 55) {
        rT += 5;
      } else {
        rT += parseFloat(data.orders_past_6months[i].ratedRating);
      }
    }
    if (qt > 0) mR = rT / qt;
    setRatedValues({ quantity: qt, totalEarnings: tE, medianRating: mR });
  }

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <Box
      sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Waiter</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedUser}
          label='Waiter'
          onChange={handleChange}
        >
          {user.allUsers &&
            user.allUsers.map((user) => (
              <MenuItem value={user.username} key={user.username}>
                {user.username}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Chart
        quantity={ratedValues.quantity}
        totalEarnings={ratedValues.totalEarnings}
        medianRating={ratedValues.medianRating}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Rated);
