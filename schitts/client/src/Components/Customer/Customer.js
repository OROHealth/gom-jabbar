import React, { useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import Form from './Form';
import { postCustomer } from '../../store/utils/thunkCreators';

function Customer(props) {
  const [residing, setResiding] = useState('');
  const [drinksPreference, setDrinksPreference] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [mocktailPreference, setMocktailPreference] = useState('');
  const nameRef = useRef();

  function clear() {
    nameRef.current.firstChild.value = '';
    setResiding('');
    setDrinksPreference('');
    setFoodPreference('');
    setMocktailPreference('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const reqBody = {
      full_name: nameRef.current.firstChild.value,
      residing: residing,
      drink_preference: drinksPreference,
      food_preference: foodPreference,
      mocktail_preference: mocktailPreference,
    };
    await postCustomer(reqBody);
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
          gap: '20px',
        }}
      >
        <Form
          nameRef={nameRef}
          setResiding={setResiding}
          foodPreference={foodPreference}
          drinksPreference={drinksPreference}
          mocktailPreference={mocktailPreference}
          setDrinksPreference={setDrinksPreference}
          setFoodPreference={setFoodPreference}
          setMocktailPreference={setMocktailPreference}
        />
        <Button variant='contained' onClick={handleSubmit}>
          ADD CUSTOMER
        </Button>
      </Box>
    </>
  );
}

export default Customer;
