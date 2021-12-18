import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, CssBaseline, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fetchItems } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/user';
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
  const { user, logout, fetchItems } = props;
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
    fetchItems();
  }, [fetchItems]);

  if (props.user.isFetchingUsers) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout();
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
      <Button
        className={classes.logout}
        sx={{ visibility: user.activeUser ? 'visible' : 'hidden' }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Container maxWidth='lg' className={classes.container}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={schitts_creek}
            alt='schitts creek logo'
            className={classes.img}
          />
        </Box>
        {user.activeUser ? (
          <OrderTabs />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '70%',
            }}
          >
            <Login />
          </Box>
        )}
        <CssBaseline />
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
    logout: () => {
      dispatch(clearOnLogout());
    },
    fetchItems: () => {
      dispatch(fetchItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
