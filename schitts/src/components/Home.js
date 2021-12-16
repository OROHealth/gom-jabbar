import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, CssBaseline, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { logout, fetchOrders } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/index';
import SnackbarError from './SnackbarError';

import Login from './Login';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { user, orders, logout, fetchOrders } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === 'string') {
        setErrorMessage(user.error);
      } else {
        setErrorMessage('Internal Server Error. Please try again');
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // if (props.user.isFetchingUsers) {
  //   return <div>Loading...</div>;
  // }

  const handleLogout = async () => {
    await logout(user.id);
  };

  return (
    <>
      <h1>hi</h1>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component='main' className={classes.root}>
        <Login />
        <CssBaseline />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchOrders: () => {
      dispatch(fetchOrders());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
