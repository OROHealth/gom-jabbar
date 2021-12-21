import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Button,
  Box,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';

import TimePicker from './TimePicker';
import Choices from './Choices';
import Feedback from './Feedback';

import { postOrder } from '../../../store/utils/thunkCreators';
import axios from 'axios';

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
  width: '200px',
});

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  maxWidth: '800px',
  margin: '0 auto',
};

const Order = (props) => {
  const { user, postOrder, items, orders } = props;
  const [value, setValue] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfCustomers, setnumberOfCustomers] = useState('');
  const [splitOfBill, setSplitOfBill] = useState(1);
  const [feedback, setFeedback] = useState(2);
  const [tone, setTone] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (orders.isPosting === 'success') {
      handleClear();
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        orders.isPosting = false;
      }, 1500);
    }
  }, [orders, orders.isPosting]);

  const handleClose = () => setOpen(false);

  const handleClear = () => {
    setSelectedItems([]);
    setTotalPrice(0);
    setnumberOfCustomers('');
    setSplitOfBill(1);
    setFeedback(2);
    setTone('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = new Date();
    const reqBody = {
      date: date.toString(),
      user: user.activeUser,
      items: selectedItems,
      tone: tone,
      numberOfCustomers: numberOfCustomers,
      splitOfBill: splitOfBill,
      total: totalPrice,
      totalPerBill: totalPrice / splitOfBill,
      feedback: feedback,
    };
    await postOrder(reqBody);
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
          <Typography variant='h4'>Order placed</Typography>
        </Box>
      </Modal>
      <Box component='form' sx={boxStyle} onSubmit={handleSubmit}>
        <TimePicker value={value} setValue={setValue} />
        <Choices
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          numberOfCustomers={numberOfCustomers}
          setnumberOfCustomers={setnumberOfCustomers}
          splitOfBill={splitOfBill}
          setSplitOfBill={setSplitOfBill}
          setTone={setTone}
        />
        <Feedback setFeedback={setFeedback} />
        <Box sx={{ position: 'relative', margin: '0 auto' }}>
          <SubmitButton
            type='submit'
            sx={{ opacity: orders.isPosting === true ? '0.1' : '1' }}
            disabled={orders.isPosting === true ? true : false}
          >
            {orders.isPosting === 'Something went wrong'
              ? 'Try Again'
              : 'Submit'}
          </SubmitButton>
          {orders.isPosting === true && (
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
    user: state.user,
    items: state.items,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postOrder: (order) => {
      dispatch(postOrder(order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
