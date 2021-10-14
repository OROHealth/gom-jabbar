import { connect } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Input,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
} from '@mui/material';

function Form(props) {
  const { drinks, food, mocktails } = props;

  function handleChangeDrinks(e) {
    props.setDrinksPreference(e.target.value);
  }

  function handleChangeFood(e) {
    props.setFoodPreference(e.target.value);
  }

  function handleChangeMocktail(e) {
    props.setMocktailPreference(e.target.value);
  }

  return (
    <>
      <FormControl>
        <InputLabel htmlFor='Name'>Name</InputLabel>
        <Input
          id='Name'
          aria-describedby='my-helper-text'
          ref={props.nameRef}
        />
      </FormControl>
      <FormControl>
        <FormLabel component='legend'>Type</FormLabel>
        <RadioGroup row aria-label='gender' name='row-radio-buttons-group'>
          <FormControlLabel
            value='out-of-town'
            control={<Radio />}
            label='Out of town'
            onClick={() => props.setResiding('out of town')}
          />
          <FormControlLabel
            value='in-town'
            control={<Radio />}
            label='In town'
            onClick={() => props.setResiding('in town')}
          />
          <FormControlLabel
            value='family'
            control={<Radio />}
            label='Family'
            onClick={() => props.setResiding('family')}
          />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='drinks-preference'>Drinks Preference</InputLabel>
        <Select
          labelId='drinks-preference'
          id='drinks-preference'
          value={props.drinksPreference}
          label='Drinks Preference'
          onChange={handleChangeDrinks}
        >
          {drinks &&
            drinks.map((drinks) => (
              <MenuItem value={drinks.name} key={drinks.name}>
                {drinks.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='mocktail-preference'>Mocktail Preference</InputLabel>
        <Select
          labelId='mocktail-preference'
          id='mocktail-preference'
          value={props.mocktailPreference}
          label='Mocktail Preference'
          onChange={handleChangeMocktail}
        >
          {mocktails &&
            mocktails.map((mocktail) => (
              <MenuItem value={mocktail.name} key={mocktail.name}>
                {mocktail.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='food-preference'>Food Preference</InputLabel>
        <Select
          labelId='food-preference'
          id='food-preference'
          value={props.foodPreference}
          label='Food Preference'
          onChange={handleChangeFood}
        >
          {food &&
            food.map((food) => (
              <MenuItem value={food.name} key={food.name}>
                {food.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    drinks: state.drinks,
    food: state.food,
    mocktails: state.mocktails,
  };
};

export default connect(mapStateToProps, null)(Form);
