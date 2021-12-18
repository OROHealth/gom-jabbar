import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import './menu.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const addButtonStyle = {
  background: 'black',
  fontSize: '1.5rem',
  p: 2,
  color: '#F1C70F',
  '&:hover': {
    background: '#515151',
  },
};

const editButtonStyle = {
  background: '#8931FE',
  fontSize: '1.5rem',
  p: 2,
  color: '#F4D74D',
  '&:hover': {
    background: '#A665FE',
  },
};

const deleteButtonStyle = {
  fontSize: '1.5rem',
  p: 2,
  '&:hover': {
    background: '#EB6956',
  },
};

const closeButtonBoxStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  color: '#808080',
};

const SubmitButton = styled(Button)({
  background: 'black',
  color: '#F1C70F',
  '&:hover': {
    background: '#8931FE',
  },
});

export default function MenuModal(props) {
  const menuItems = [
    {
      type: 'drink',
      name: 'mocha',
      price: 4,
      level: 7,
      date: Date.now(),
      length: '2 days',
    },
    {
      type: 'drink',
      name: 'frappaccino',
      price: 5,
      level: 7,
      date: Date.now(),
      length: '2 days',
    },
    {
      type: 'drink',
      name: 'milk',
      price: 3,
      level: 7,
      date: Date.now(),
      length: '2 days',
    },
    {
      type: 'food',
      name: 'pizza',
      price: 4,
      level: 7,
      date: Date.now(),
      length: '2 days',
    },
    {
      type: 'food',
      name: 'bagel',
      price: 5,
      level: 7,
      date: Date.now(),
      length: '2 days',
    },
    {
      type: 'food',
      name: 'cheesecake',
      price: 3,
      level: 7,
      date: Date.now(),
      length: '2 days',
    },
  ];
  // const {menuItems} = props
  const [open, setOpen] = useState(false);
  const [alignment, setAlignment] = useState('food');
  const [values, setValues] = useState({
    name: '',
    price: '',
    level: '',
    length: '',
  });
  const [param, setParam] = useState('');
  const [item, setItem] = useState('');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleAlignmentChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleItemChange = (event) => {
    setItem(event.target.value);
    if (param === 'edit' || param === 'delete') {
      const item = menuItems.find((a) => a.name === event.target.value);
      setValues(item);
      setAlignment(item.type);
    }
  };
  const handleOpen = (param) => {
    setOpen(true);
    setParam(param);
    if (param === 'add') {
      setValues({ name: '', price: '', level: '', length: '' });
      setItem('');
      setAlignment('food');
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 7 }}>
        <Button onClick={() => handleOpen('add')} sx={addButtonStyle}>
          Add item
        </Button>
        <Button onClick={() => handleOpen('edit')} sx={editButtonStyle}>
          Edit item
        </Button>
        <Button
          onClick={() => handleOpen('delete')}
          sx={deleteButtonStyle}
          color='error'
        >
          Delete item
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box sx={closeButtonBoxStyle}>
            <div className='close-button' onClick={handleClose}>
              <CloseIcon />
            </div>
          </Box>
          <FormControl
            fullWidth
            sx={{
              margin: '15px 0',
              display: param === 'edit' || param === 'delete' ? 'flex' : 'none',
            }}
          >
            <InputLabel id='select-label'>Item</InputLabel>
            <Select
              labelId='select-label'
              id='select'
              value={item}
              label='Item'
              onChange={handleItemChange}
            >
              {menuItems.map((item) => (
                <MenuItem value={item.name} key={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ToggleButtonGroup
            color='primary'
            value={alignment}
            exclusive
            onChange={handleAlignmentChange}
            disabled={param === 'delete' ? true : false}
          >
            <ToggleButton value='food'>Food</ToggleButton>
            <ToggleButton value='drink'>Drink</ToggleButton>
          </ToggleButtonGroup>
          <FormControl variant='filled' fullWidth>
            <InputLabel htmlFor='filled-adornment-name'>Name</InputLabel>
            <FilledInput
              disabled={param === 'delete' ? true : false}
              id='filled-adornment-name'
              value={values.name}
              onChange={handleChange('name')}
            />
          </FormControl>{' '}
          <FormControl variant='filled' fullWidth>
            <InputLabel htmlFor='filled-adornment-price'>Price</InputLabel>
            <FilledInput
              disabled={param === 'delete' ? true : false}
              id='filled-adornment-price'
              value={values.price}
              onChange={handleChange('price')}
              startAdornment={
                <InputAdornment position='start'>$</InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant='filled' fullWidth>
            <InputLabel htmlFor='filled-adornment-level'>
              Level of acceptable over-cooked-ness
            </InputLabel>
            <FilledInput
              disabled={param === 'delete' ? true : false}
              id='filled-adornment-level'
              value={values.level}
              onChange={handleChange('level')}
            />
          </FormControl>
          <FormControl variant='filled' fullWidth>
            <InputLabel htmlFor='filled-adornment-length'>
              Length of time can be kept in fridge
            </InputLabel>
            <FilledInput
              disabled={param === 'delete' ? true : false}
              id='filled-adornment-length'
              value={values.length}
              onChange={handleChange('length')}
            />
          </FormControl>
          {param === 'delete' ? (
            <Button color='error' sx={{ mt: 3 }}>
              Delete
            </Button>
          ) : (
            <SubmitButton sx={{ mt: 3 }}>Submit</SubmitButton>
          )}
        </Box>
      </Modal>
    </div>
  );
}
