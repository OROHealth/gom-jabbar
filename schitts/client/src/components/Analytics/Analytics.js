import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Rated from './8rated';

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

const Analytics = () => {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Link to='/' className={classes.link}>
          <Button>Go back</Button>
        </Link>
      </Box>
      <Container maxWidth='lg' sx={containerStyle}>
        <Grid container>
          <Grid item xs={6}>
            <Rated />
          </Grid>
          <Grid item xs={6}>
            -what is the evolution of the number of drinks that Alexis and David
            have taken alone compared to the number together over time
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

export default Analytics;
