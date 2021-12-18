import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  CircularProgress,
} from '@mui/material';
import { postCustomer } from '../../../store/utils/thunkCreators';

import TypeOfCustomer from './TypeOfCustomer';
import Preferences from './Preferences';

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

const SubmitButton = styled(Button)({
  background: 'black',
  color: '#F1C70F',
  '&:hover': {
    background: '#8931FE',
  },
  marginBottom: '50px',
  width: '100%',
});

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  maxWidth: '800px',
  margin: '0 auto',
};

const CustomerInfo = (props) => {
  const { customer, postCustomer } = props;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [food, setFood] = useState('');
  const [drink, setDrink] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (customer.isPosting === 'success') {
      handleClear();
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        customer.isPosting = false;
      }, 1500);
    }
  }, [customer, customer.isPosting]);

  const handleClose = () => setOpen(false);

  const handleClear = () => {
    setName('');
    setType('');
    setFood('');
    setDrink('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = new Date();
    const reqBody = {
      date: date.toString(),
      name: name,
      type: type,
      drinkPreference: drink,
      foodPreference: food,
    };
    await postCustomer(reqBody);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalBoxStyle}>
          <Typography variant='h4'>Customer added</Typography>
        </Box>
      </Modal>
      <Box component='form' onSubmit={handleSubmit} sx={boxStyle}>
        <TextField
          fullWidth
          id='filled-basic'
          label='Customer name'
          variant='filled'
          value={name}
          onChange={handleChange}
        />
        <TypeOfCustomer type={type} setType={setType} />
        <Preferences
          food={food}
          setFood={setFood}
          drink={drink}
          setDrink={setDrink}
        />
        <Box sx={{ position: 'relative', width: '100%' }}>
          <SubmitButton
            type='submit'
            sx={{ opacity: customer.isPosting === true ? '0.1' : '1' }}
            disabled={customer.isPosting === true ? true : false}
          >
            {customer.isPosting === 'Something went wrong'
              ? 'Try Again'
              : 'Submit'}
          </SubmitButton>
          {customer.isPosting === true && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '0',
                left: '50%',
                marginTop: '5px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    customer: state.customer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postCustomer: (customer) => {
      dispatch(postCustomer(customer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);
