import React, { useState } from 'react';
import { FormControl, Box, Button } from '@mui/material';
import { connect } from 'react-redux';
import Waiter from './Waiter';
import ItemPicker from './ItemPicker';
import TonePicker from './TonePickers';
import CustomerNumber from './CustomerNumber';
import SplitType from './Split_of_bill';
import { postOrder } from '../../store/utils/thunkCreators';

function Order(props) {
  const { waiters, items } = props;
  const [waiter, setWaiter] = useState('');
  const [item, setItem] = useState('');
  const [tone, setTone] = useState('');
  const [customerNumber, setCustomerNumber] = useState(4);
  const [splitType, setSplitType] = useState('person');
  const [ratio, setRatio] = useState(25);

  function clear() {
    setItem('');
    setTone('');
    setCustomerNumber(4);
    setSplitType('');
    setRatio(25);
    setWaiter('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const date = new Date();
    const reqBody = {
      date: date,
      hour: date.getHours(),
      waiter: waiter,
      item: item,
      tone: tone,
      number_of_customer: customerNumber,
      split_of_bill: {
        option: splitType,
        ratio: ratio,
      },
    };
    await postOrder(reqBody);
    clear();
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          margin: '100px auto 0',
          gap: '10px',
        }}
      >
        <FormControl>
          <Waiter waiters={waiters} waiter={waiter} setWaiter={setWaiter} />
        </FormControl>
        <FormControl>
          <ItemPicker items={items} item={item} setItem={setItem} />
        </FormControl>
        <FormControl>
          <TonePicker setTone={setTone} />
        </FormControl>
        <FormControl>
          <CustomerNumber
            customerNumber={customerNumber}
            setCustomerNumber={setCustomerNumber}
            setRatio={setRatio}
          />
        </FormControl>
        <FormControl>
          <SplitType
            splitType={splitType}
            setSplitType={setSplitType}
            ratio={ratio}
          />
        </FormControl>
        <Button variant='contained' onClick={handleSubmit}>
          ORDER
        </Button>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    waiters: state.waiters,
    items: state.items,
  };
};

export default connect(mapStateToProps, null)(Order);
