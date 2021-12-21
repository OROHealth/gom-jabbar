import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  addItem,
  editItem,
  deleteItem,
} from '../../../store/utils/thunkCreators';
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

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '175px',
  width: '375px',
  background: 'black',
  color: '#F1C70F',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
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

const MenuModal = (props) => {
  const { items, addItem, editItem, deleteItem } = props;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('food');
  const [values, setValues] = useState({
    name: '',
    price: '',
    acceptableLevel: '',
    lengthOfTime: '',
  });
  const [param, setParam] = useState('');
  const [item, setItem] = useState('');

  useEffect(() => {
    if (
      items.isPosting === 'added' ||
      items.isPosting === 'edited' ||
      items.isPosting === 'deleted'
    ) {
      handleClear();
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        items.isPosting = false;
      }, 1500);
    }
  }, [items, items.isPosting]);

  const handleClear = () => {
    setValues({ name: '', price: '', acceptableLevel: '', lengthOfTime: '' });
    setItem('');
    setType('food');
  };

  // HANDLECHANGE
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleAlignmentChange = (event, newAlignment) => {
    setType(newAlignment);
  };
  const handleItemChange = (event) => {
    setItem(event.target.value);
    if (param === 'edit' || param === 'delete') {
      const item = items.allItems.find((a) => a.name === event.target.value);
      setValues(item);
      setType(item.type);
    }
  };

  // MODAL TOGGLE
  const handleOpen = (param) => {
    setOpen(true);
    setParam(param);
    if (param === 'add') {
      setValues({ name: '', price: '', acceptableLevel: '', lengthOfTime: '' });
      setItem('');
      setType('food');
    }
  };
  const handleClose = () => setOpen(false);

  // SUBMIT
  const handleSubmit = async (event, param) => {
    event.preventDefault();
    const date = new Date();
    const reqBody = {
      date: date.toString(),
      type: type,
      name: values.name,
      price: values.price,
      acceptableLevel: values.acceptableLevel,
      lengthOfTime: values.lengthOfTime,
      oldName: item,
    };
    if (param === 'add') await addItem(reqBody);
    if (param === 'edit') await editItem(reqBody);
    if (param === 'delete') await deleteItem(reqBody);
  };

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
        {items.isPosting === 'added' ||
        items.isPosting === 'edited' ||
        items.isPosting === 'deleted' ? (
          <Box sx={modalBoxStyle}>
            <Typography variant='h4'>
              {items.isPosting === 'added' && 'Item added'}
              {items.isPosting === 'edited' && 'Item edited'}
              {items.isPosting === 'deleted' && 'Item deleted'}
            </Typography>
          </Box>
        ) : (
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
                display:
                  param === 'edit' || param === 'delete' ? 'flex' : 'none',
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
                {items.allItems &&
                  items.allItems.map((item) => (
                    <MenuItem value={item.name} key={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <ToggleButtonGroup
              color='primary'
              value={type}
              exclusive
              onChange={handleAlignmentChange}
              disabled={param === 'delete' ? true : false}
            >
              <ToggleButton value='food'>Food</ToggleButton>
              <ToggleButton value='drink'>Drink</ToggleButton>
              <ToggleButton value='mocktail'>Mocktail</ToggleButton>
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
                value={values.acceptableLevel}
                onChange={handleChange('acceptableLevel')}
              />
            </FormControl>
            <FormControl variant='filled' fullWidth>
              <InputLabel htmlFor='filled-adornment-length'>
                Length of time can be kept in fridge
              </InputLabel>
              <FilledInput
                disabled={param === 'delete' ? true : false}
                id='filled-adornment-length'
                value={values.lengthOfTime}
                onChange={handleChange('lengthOfTime')}
              />
            </FormControl>
            {param === 'delete' && (
              <Button
                color='error'
                sx={{ mt: 3, opacity: items.isPosting === true ? '0.1' : '1' }}
                onClick={(e) => handleSubmit(e, 'delete')}
                disabled={items.isPosting === true ? true : false}
              >
                {items.isPosting === 'Something went wrong'
                  ? 'Try Again'
                  : 'Delete'}
              </Button>
            )}
            {param === 'add' && (
              <SubmitButton
                sx={{ mt: 3, opacity: items.isPosting === true ? '0.1' : '1' }}
                onClick={(e) => handleSubmit(e, 'add')}
                disabled={items.isPosting === true ? true : false}
              >
                {items.isPosting === 'Something went wrong'
                  ? 'Try Again'
                  : 'Submit'}
              </SubmitButton>
            )}
            {param === 'edit' && (
              <SubmitButton
                sx={{ mt: 3, opacity: items.isPosting === true ? '0.1' : '1' }}
                onClick={(e) => handleSubmit(e, 'edit')}
                disabled={items.isPosting === true ? true : false}
              >
                {items.isPosting === 'Something went wrong'
                  ? 'Try Again'
                  : 'Submit'}
              </SubmitButton>
            )}
          </Box>
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
      dispatch(addItem(item));
    },
    editItem: (item) => {
      dispatch(editItem(item));
    },
    deleteItem: (item) => {
      dispatch(deleteItem(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);
