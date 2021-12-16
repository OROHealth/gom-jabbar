import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Box, TextField } from '@mui/material';
import { fetchUsers } from '../store/utils/thunkCreators';

const Login = (props) => {
  const { fetchUsers } = props;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Container maxWidth='lg'>
        <Grid>
          <Grid item xs={4}>
            user
          </Grid>
          <Grid item xs={4}>
            user
          </Grid>
          <Grid item xs={4}>
            user
          </Grid>
          <Grid item xs={12}>
            <Box component='form' noValidate autoComplete='off'>
              <TextField id='filled-basic' label='Filled' variant='filled' />
            </Box>
          </Grid>
        </Grid>
      </Container>
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
