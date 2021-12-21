import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import axios from 'axios';

import Chart from './charts/multiSeries';

const Rated = (props) => {
  const { user } = props;
  const [evolutionValues, setEvolutionValues] = useState([
    {
      evo1: [],
      evo2: [],
      together: [],
    },
  ]);
  const [user1, setUser1] = useState('Twyla');
  const [user2, setUser2] = useState('Tom');

  useEffect(() => {
    const getDrinkEvolution = async (user1, user2) => {
      const { data } = await axios.get(
        `/api/analytics/drinks-taken/${user1}/${user2}`
      );
      setEvolutionValues({
        evo1: data.evolution1,
        evo2: data.evolution2,
        together: data.together,
      });
    };
    getDrinkEvolution(user1, user2);
  }, [user1, user2]);

  const handleChange = (event, param) => {
    param === 'user1'
      ? setUser1(event.target.value)
      : setUser2(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: '50%' }}>
          <InputLabel id='demo-simple-select-label'>Waiter</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={user1}
            label='Waiter'
            onChange={(e) => handleChange(e, 'user1')}
          >
            {user.allUsers &&
              user.allUsers.map((user) => (
                <MenuItem value={user.username} key={user.username}>
                  {user.username}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '50%' }}>
          <InputLabel id='demo-simple-select-label'>Waiter</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={user2}
            label='Waiter'
            onChange={(e) => handleChange(e, 'user2')}
          >
            {user.allUsers &&
              user.allUsers.map((user) => (
                <MenuItem value={user.username} key={user.username}>
                  {user.username}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Chart
        user1={user1}
        user2={user2}
        evolution1={evolutionValues.evo1}
        evolution2={evolutionValues.evo2}
        together={evolutionValues.together}
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
