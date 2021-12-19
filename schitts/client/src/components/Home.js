import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, CssBaseline, Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fetchItems } from '../store/utils/thunkCreators';
import { clearOnLogout } from '../store/user';
import SnackbarError from './SnackbarError';
import AnalyticsIcon from '@mui/icons-material/Analytics';

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
  navbarBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
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
      <Box className={classes.navbarBox}>
        <Box sx={{ display: user.activeUser ? 'none' : 'block' }}>
          <Link to='/analytics' className={classes.link}>
            <Button sx={{ display: 'flex', gap: 1 }}>
              <AnalyticsIcon />
              Analytics
            </Button>
          </Link>
        </Box>
        <Button
          sx={{ display: user.activeUser ? 'block' : 'none', pl: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            mr: 2,
            height: '50px',
          }}
        >
          <Typography
            sx={{
              visibility: user.activeUser ? 'visible' : 'hidden',
              paddingTop: '4px',
              fontWeight: 'bold',
            }}
            variant='caption'
            color='secondary'
          >
            Logged in as
          </Typography>
          <Typography
            sx={{
              visibility: user.activeUser ? 'visible' : 'hidden',
              fontWeight: 'bold',
            }}
            variant='h6'
            color='primary'
          >
            {user.activeUser && `${user.activeUser}`}
          </Typography>
        </Box>
      </Box>
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
