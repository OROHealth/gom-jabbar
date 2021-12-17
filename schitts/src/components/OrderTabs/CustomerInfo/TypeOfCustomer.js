import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const CustomerInfo = () => {
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
        />
        <FormControlLabel value='in town' control={<Radio />} label='In town' />
      </RadioGroup>
    </FormControl>
  );
};

export default CustomerInfo;
