import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchUsers } from '../store/utils/thunkCreators';
import { gotUser } from '../store/user';

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

const typographyStyle = {
  margin: '0 auto',
};

const Login = (props) => {
  const { fetchUsers, user, gotUser } = props;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleClick = (event) => {
    const username = event.target.innerText;
    gotUser(username);
  };

  return (
    <>
      <Grid container spacing={1}>
        {user.allUsers ? (
          user.allUsers.map((user) => (
            <Grid item xs={4} key={user.username}>
              <UserButton fullWidth onClick={handleClick}>
                {user.username}
              </UserButton>
            </Grid>
          ))
        ) : (
          <Typography sx={typographyStyle} variant='h4' color='error'>
            Something went wrong
          </Typography>
        )}
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
    gotUser: (user) => {
      dispatch(gotUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
