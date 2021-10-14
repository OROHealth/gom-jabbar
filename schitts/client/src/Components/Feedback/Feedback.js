import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
} from '@mui/material';
import { connect } from 'react-redux';
import { fetchFeedback, postFeedback } from '../../store/utils/thunkCreators';

import Form from './Form';

const MenuItems = (props) => {
  const { fetchFeedback, postFeedback, feedback, waiters, items } = props;
  const [item, setItem] = useState('');
  const [waiter, setWaiter] = useState('');
  const [rating, setRating] = useState(4);
  const nameRef = useRef();
  const feedbackRef = useRef();

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  function clear() {
    setItem('');
    setWaiter('');
    setRating(4);
    nameRef.current.firstChild.value = '';
    feedbackRef.current.firstChild.value = '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const reqBody = {
      customer: nameRef.current.firstChild.value,
      waiter: waiter,
      item: item,
      rating: rating,
      comment: feedbackRef.current.firstChild.value,
    };
    await postFeedback(reqBody);
    clear();
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80%',
          margin: '0 auto',
          gap: '10px',
        }}
      >
        <Form
          items={items}
          waiters={waiters}
          item={item}
          setItem={setItem}
          waiter={waiter}
          setWaiter={setWaiter}
          rating={rating}
          setRating={setRating}
          nameRef={nameRef}
          feedbackRef={feedbackRef}
        />
        <Button
          variant='contained'
          size='large'
          sx={{ width: '300px' }}
          onClick={handleSubmit}
        >
          SEND FEEDBACK
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '50px',
            gap: '20px',
          }}
        >
          {feedback &&
            feedback.map((feedback) => (
              <Card variant='outlined' sx={{ width: 500 }} key={feedback._id}>
                <CardContent>
                  <Rating name='read-only' value={feedback.rating} readOnly />
                  <Typography variant='h5' component='div'>
                    Customer: {feedback.customer}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Waiter: {feedback.waiter}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Item: {feedback.item}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Comment: {feedback.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    waiters: state.waiters,
    items: state.items,
    feedback: state.feedback,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeedback: () => {
      dispatch(fetchFeedback());
    },
    postFeedback: (body) => {
      dispatch(postFeedback(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
