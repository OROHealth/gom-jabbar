import { useState } from 'react';
import {
  Button,
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const UserButton = styled(Button)({
  height: '80px',
  background: '#8931FE',
  color: '#F4D74D',
  fontSize: '1.5rem',
  '&:hover': {
    background: '#A665FE',
  },
  '&:focus': {
    background: 'black',
    color: '#F1C70F',
  },
});

export default function BasicSelect() {
  const [selectedItems, setSelectedItems] = useState('');
  const [menuItems, setMenuItems] = useState([
    { name: 'mocha', price: 4 },
    { name: 'pizza', price: 5 },
    { name: 'cheesecake', price: 3 },
  ]);
  const [numberOfCustomers, setnumberOfCustomers] = useState('');
  const [splitOfBill, setSplitOfBill] = useState('');

  const tones = [
    'Angry',
    'Happy',
    'Overwhelmed',
    'Pregnant',
    'Moody',
    'Bored',
    'Excited',
  ];
  const fifteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const handleChange = (event, param) => {
    if (param === 'menuItem') setSelectedItems(event.target.value);
    if (param === 'Number of customers')
      setnumberOfCustomers(event.target.value);
    if (param === 'Split of bill') setSplitOfBill(event.target.value);
  };

  const handleClick = (e, item) => {
    setSelectedItems([...selectedItems, item]);
    console.log(selectedItems);
  };

  return (
    <Box
      sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Grid container spacing={1}>
        {menuItems.map((item) => (
          <Grid item xs={4} key={item.name}>
            <UserButton
              fullWidth
              sx={{
                background: item.focus ? 'black' : '#8931FE',
                // color: '#F1C70F',
              }}
              onClick={(e) => handleClick(e, item)}
            >
              {item.name}
            </UserButton>
          </Grid>
        ))}
      </Grid>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Tone of customer</FormLabel>
        <RadioGroup
          row
          aria-label='Tone of customer'
          name='row-radio-buttons-group'
        >
          {tones.map((tone) => (
            <FormControlLabel
              value={tone}
              key={tone}
              control={<Radio />}
              label={tone}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>
          How many customers?
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={numberOfCustomers}
          label='How many customers?'
          onChange={(e) => handleChange(e, 'Number of customers')}
        >
          {fifteen.map((number) => (
            <MenuItem value={number} key={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>
          Split how many ways?
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={splitOfBill}
          label='Split how many ways?'
          onChange={(e) => handleChange(e, 'Split of bill')}
        >
          {fifteen.map((number) => (
            <MenuItem value={number} key={number}>
              {number === 1 ? `${number}-way` : `${number}-ways`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
