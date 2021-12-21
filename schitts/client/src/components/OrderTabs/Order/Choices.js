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
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { connect } from 'react-redux';

const UserButton = styled(Button)({
  height: '80px',
  background: '#8931FE',
  color: '#F4D74D',
  fontSize: '1.5rem',
});

const BasicSelect = (props) => {
  const {
    items,
    selectedItems,
    setSelectedItems,
    totalPrice,
    setTotalPrice,
    numberOfCustomers,
    setnumberOfCustomers,
    splitOfBill,
    setSplitOfBill,
    setTone,
  } = props;

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
    if (param === 'tone') setTone(event.target.value);
  };

  // button color focus and selected items handling
  const handleClick = (e, item, idx) => {
    if (item.focus === true) {
      item.focus = false;
    } else {
      item.focus = true;
    }
    if (selectedItems.includes(item)) {
      const filter = selectedItems.filter((a) => a !== item);
      setSelectedItems(filter);
      setTotalPrice(totalPrice - item.price);
    } else {
      setSelectedItems([...selectedItems, item]);
      setTotalPrice(totalPrice + item.price);
    }
  };

  return (
    <Box
      sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Grid container spacing={1}>
        {items.allItems &&
          items.allItems.map((item, idx) => (
            <Grid
              item
              xs={4}
              sx={{ display: item === true ? 'none' : 'block' }}
              key={idx}
            >
              <UserButton
                fullWidth
                sx={{
                  background: item.focus === true ? 'black' : '#8931FE',
                  '&:hover': {
                    background: item.focus === true ? '#515151' : '#A665FE',
                  },
                }}
                onClick={(e) => handleClick(e, item, idx)}
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
              onChange={(e) => handleChange(e, 'tone')}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
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
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
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
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            margin: '20px 0',
          }}
        >
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id='readonly'
            label='Total'
            value={`$${totalPrice}`}
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id='readonly'
            label='Total per bill'
            value={`$${totalPrice / splitOfBill}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, null)(BasicSelect);
