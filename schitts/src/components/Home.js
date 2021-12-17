import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, CssBaseline, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { logout, fetchOrders } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/index';
import SnackbarError from './SnackbarError';

import Login from './Login';
import OrderTabs from './OrderTabs/OrderTabs';

import schitts_creek from "../assets/Schitt's_Creek_logo.png";

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    height: '100px',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const { user, orders, logout, fetchOrders } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [tempUser, setTempUser] = useState({ id: 'Twyla' });

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

  if (props.user.isFetchingUsers) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    await logout(user.id);
  };

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      {/* <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button> */}
      <Container maxWidth='lg' className={classes.container}>
        <img
          src={schitts_creek}
          alt='schitts creek logo'
          className={classes.img}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70%',
          }}
        >
          {tempUser ? <OrderTabs /> : <Login />}
        </Box>
        <CssBaseline />
      </Container>
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
