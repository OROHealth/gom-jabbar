import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const CustomerInfo = (props) => {
  const { type, setType } = props;

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Type of customer</FormLabel>
      <RadioGroup
        row
        aria-label='Type of customer'
        name='row-radio-buttons-group'
        value={type}
        onChange={handleChange}
      >
        <FormControlLabel
          value='out of town'
          control={<Radio />}
          label='Out of town'
        />
        <FormControlLabel value='in town' control={<Radio />} label='In town' />
        <FormControlLabel
          value="part of Rose's family"
          control={<Radio />}
          label="Part of Rose's family"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CustomerInfo;
