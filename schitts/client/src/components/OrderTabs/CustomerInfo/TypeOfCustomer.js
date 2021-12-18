import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const CustomerInfo = (props) => {
  const { setType } = props;

  const handleClick = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Type of customer</FormLabel>
      <RadioGroup
        row
        aria-label='Type of customer'
        name='row-radio-buttons-group'
      >
        <FormControlLabel
          value='out of town'
          control={<Radio />}
          label='Out of town'
          onClick={handleClick}
        />
        <FormControlLabel
          value='in town'
          control={<Radio />}
          label='In town'
          onClick={handleClick}
        />
        <FormControlLabel
          value="part of Rose's family"
          control={<Radio />}
          label="Part of Rose's family"
          onClick={handleClick}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CustomerInfo;
