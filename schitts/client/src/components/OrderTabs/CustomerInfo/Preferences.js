import { connect } from 'react-redux';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const BasicSelect = (props) => {
  const { items, food, drink, setFood, setDrink } = props;
  const drinks = items.drinks;
  const foods = items.food;

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
            <MenuItem value={drink.name} key={drink.name}>
              {drink.name}
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
            <MenuItem value={food.name} key={food.name}>
              {food.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, null)(BasicSelect);
