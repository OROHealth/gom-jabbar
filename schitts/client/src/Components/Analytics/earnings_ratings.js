import { useState } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

function Earnings_ratings(props) {
  const { orders, waiters, items, feedback } = props;
  const [waiter, setWaiter] = useState('');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [medianRating, setMedianRating] = useState(0);

  const handleChange = (event) => {
    const waiter = event.target.value;

    // filter waiter orders for past 6 months
    const present = new Date();
    const filtered_orders = orders.filter(
      (a) =>
        a.waiter === waiter &&
        new Date(a.date).setMonth(new Date(a.date).getMonth()) >
          present.setMonth(present.getMonth() - 6)
    );

    // return items only
    let items = [];
    for (let i = 0; i < filtered_orders.length; i++) {
      items.push(filtered_orders[i].item);
    }

    // calculate earnings && setWaiter state
    getTotalEarnings(items);
    getMedianRating(waiter, items);
    setWaiter(waiter);
  };

  const getTotalEarnings = (filtered_items) => {
    // total earnings for 8-rated or higher meals
    let sum = 0;
    for (let i = 0; i < filtered_items.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (
          filtered_items[i] === items[j].name &&
          items[j].acceptable_level >= 8
        ) {
          sum += items[j].price;
        }
      }
    }
    setTotalEarnings(sum);
  };

  const getMedianRating = (waiter, filtered_items) => {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < filtered_items.length; i++) {
      for (let j = 0; j < feedback.length; j++) {
        if (
          filtered_items[i] === feedback[j].item &&
          waiter === feedback[j].waiter
        ) {
          sum += feedback[j].rating;
          count++;
        }
      }
    }
    if (!isNaN(sum / count)) setMedianRating(sum / count);
  };

  return (
    <>
      <FormLabel>8-rated served past 6 months by:</FormLabel>
      <FormControl sx={{ width: 500, marginTop: 2 }}>
        <InputLabel id='Waiter'>Waiter</InputLabel>
        <Select
          labelId='Waiter'
          id='Waiter'
          value={waiter}
          label='Waiter'
          onChange={handleChange}
        >
          {waiters &&
            waiters.map((waiter) => (
              <MenuItem value={waiter.name} key={waiter.name}>
                {waiter.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', gap: 5, margin: 3 }}
        >
          <h4>Total earnings: ${totalEarnings}</h4>
          <h4>Median rating: {medianRating}</h4>
        </Box>
      </FormControl>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    waiters: state.waiters,
    items: state.items,
    orders: state.orders,
    feedback: state.feedback,
  };
};

export default connect(mapStateToProps, null)(Earnings_ratings);
