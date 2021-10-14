import React, { useRef, useState } from 'react';
import { Button, Box, Card, CardContent, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { postItem } from '../../store/utils/thunkCreators';

import Form from './Form';

const MenuItems = (props) => {
  const { postItem, items } = props;
  const [type, setType] = useState('');
  const nameRef = useRef();
  const priceRef = useRef();
  const levelRef = useRef();
  const lengthRef = useRef();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  function clear() {
    nameRef.current.firstChild.value = '';
    setType('');
    priceRef.current.firstChild.value = '';
    levelRef.current.firstChild.value = '';
    lengthRef.current.firstChild.value = '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const reqBody = {
      name: nameRef.current.firstChild.value,
      type: type,
      price: priceRef.current.firstChild.value,
      acceptable_level: levelRef.current.firstChild.value,
      date: Date(),
      length: lengthRef.current.firstChild.value,
    };
    await postItem(reqBody);
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
          nameRef={nameRef}
          type={type}
          handleChange={handleChange}
          priceRef={priceRef}
          levelRef={levelRef}
          lengthRef={lengthRef}
        />
        <Button
          variant='contained'
          size='large'
          sx={{ width: '300px' }}
          onClick={handleSubmit}
        >
          ADD ITEM
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
          {items &&
            items.map((items) => (
              <Card variant='outlined' sx={{ width: 500 }} key={items.date}>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    Name: {items.name}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Type: {items.type}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Price: {items.price}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Acceptable over-cooked-ness: {items.acceptable_level}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Last date made: {items.date}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    Length of time: {items.length}
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
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postItem: (body) => {
      dispatch(postItem(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
