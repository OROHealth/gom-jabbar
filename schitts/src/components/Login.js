import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchUsers } from '../store/utils/thunkCreators';

const UserButton = styled(Button)({
  height: '80px',
  background: '#8931FE',
  color: '#F4D74D',
  fontSize: '1.5rem',
  '&:hover': {
    background: '#A665FE',
  },
});

const AddButton = styled(Button)({
  background: 'black',
  color: '#F1C70F',
  '&:hover': {
    background: '#8931FE',
  },
});

const Login = (props) => {
  const { fetchUsers } = props;

  const tempUsers = [
    { id: 'Twyla' },
    { id: 'Eric' },
    { id: 'Tom' },
    { id: 'Patricia' },
    { id: 'Luca' },
  ];

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Grid container spacing={1}>
        {tempUsers.map((name) => (
          <Grid item xs={4} key={name.id}>
            <UserButton fullWidth>{name.id}</UserButton>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 1 }}
          >
            <TextField
              fullWidth
              id='filled-basic'
              label='Not on the list?'
              variant='filled'
            />
            <AddButton>Add User</AddButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
