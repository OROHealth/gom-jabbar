import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { fetchUsers } from '../../store/utils/thunkCreators';

import Rated from './8rated';
import DrinkEvolution from './drinkEvolution';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
}));

const containerStyle = {
  height: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Analytics = (props) => {
  const classes = useStyles();
  const { fetchUsers } = props;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
            -the evolution of Moira's mocktails choices compared to her review
            over time
          </Grid>
          <Grid item xs={6}>
            -search an out-of-town customer's name
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
  };
};

export default connect(null, mapDispatchToProps)(Analytics);
