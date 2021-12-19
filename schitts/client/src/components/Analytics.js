import { Container, Grid } from '@mui/material';

const containerStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Analytics = () => {
  return (
    <Container maxWidth='lg' sx={containerStyle}>
      <Grid container>
        <Grid item xs={6}>
          -how many 8-rated overcooked diner did Twyla serve in the last 6
          month, how much money has been earned from those and what where the
          median ratings of these meals
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
  );
};

export default Analytics;
