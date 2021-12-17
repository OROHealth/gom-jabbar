import { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function BasicSelect() {
  const [food, setFood] = useState('');
  const [drink, setDrink] = useState('');
  const drinks = ['mocha', 'frappaccino', 'milk'];
  const foods = ['pizza', 'bagel', 'cheesecake'];

  const handleChange = (event, setting) => {
    setting === 'food'
      ? setFood(event.target.value)
      : setDrink(event.target.value);
  };

  return (
    <Box
      sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Drinks preference</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={drink}
          label='Drinks preference'
          onChange={(e) => handleChange(e, 'drink')}
        >
          {drinks.map((drink) => (
            <MenuItem value={drink} key={drink}>
              {drink}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Food preference</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={food}
          label='Food preference'
          onChange={(e) => handleChange(e, 'food')}
        >
          {foods.map((food) => (
            <MenuItem value={food} key={food}>
              {food}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
