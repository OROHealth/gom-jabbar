import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fetchUsers, fetchItems } from '../../store/utils/thunkCreators';

import Rated from './8rated';
import DrinkEvolution from './drinkEvolution';
import Mocktails from './mocktails';
import OutofTown from './outoftown';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
}));

const containerStyle = {
  height: 'maxContent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Analytics = (props) => {
  const classes = useStyles();
  const { fetchUsers, fetchItems } = props;

  useEffect(() => {
    fetchUsers();
    fetchItems();
  }, [fetchUsers, fetchItems]);

  return (
    <>
      <Box>
        <Link to='/' className={classes.link}>
          <Button>Go back</Button>
        </Link>
      </Box>
      <Container maxWidth='lg' sx={containerStyle}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Rated />
          </Grid>
          <Grid item xs={6}>
            <DrinkEvolution />
          </Grid>
          <Grid item xs={6}>
            <Mocktails />
          </Grid>
          <Grid item xs={6}>
            <OutofTown />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    fetchItems: () => {
      dispatch(fetchItems());
    },
  };
};

export default connect(null, mapDispatchToProps)(Analytics);
