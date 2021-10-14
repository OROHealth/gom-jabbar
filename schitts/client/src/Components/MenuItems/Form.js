import {
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from '@mui/material';

function Form(props) {
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
        <InputLabel id='Item'>Type</InputLabel>
        <Select
          sx={{ width: 200 }}
          labelId='Item'
          id='Item'
          value={props.type}
          label='Item'
          onChange={props.handleChange}
        >
          <MenuItem value={'Food'}>Food</MenuItem>
          <MenuItem value={'Drink'}>Drink</MenuItem>
          <MenuItem value={'Mocktail'}>Mocktail</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='Price'>Price</InputLabel>
        <Input
          id='Price'
          aria-describedby='my-helper-text'
          ref={props.priceRef}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='Level'>Level</InputLabel>
        <Input
          id='Level'
          aria-describedby='my-helper-text'
          ref={props.levelRef}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='Length'>Length</InputLabel>
        <Input
          id='Length'
          aria-describedby='my-helper-text'
          ref={props.lengthRef}
        />
      </FormControl>
    </>
  );
}

export default Form;
