import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import axios from 'axios';

import Chart from './charts/multiSeriesMock';

const Rated = (props) => {
  const { user, items } = props;

  const [selectedUser, setSelectedUser] = useState('Moira');
  const [mocktails, setMocktails] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMockReviews = async () => {
      const { data } = await axios.get(
        `/api/analytics/mocktailToReview/${selectedUser}`
      );
      setMocktails(data.mocktails);
      setReviews(data.reviews);
    };
    getMockReviews();
  }, [items.mocktails, selectedUser]);

  const handleChange = (event, param) => {
    setSelectedUser(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
      <Chart mocktails={mocktails} reviews={reviews} />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    items: state.items,
  };
};

export default connect(mapStateToProps, null)(Rated);
