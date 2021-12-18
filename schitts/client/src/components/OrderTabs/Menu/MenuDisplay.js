import { connect } from 'react-redux';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AlignItemsList = (props) => {
  const { items } = props;
  const drinks = items.drinks;
  const foods = items.food;

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            variant='h5'
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            Food
          </Typography>
          {foods.map((food, idx) => (
            <div key={idx}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography variant='h6'>{food.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Price: {food.price}</Typography>
                  <Typography>
                    Level of acceptable over-coooked-ness:{' '}
                    {food.acceptableLevel}
                  </Typography>
                  <Typography>
                    Last date where the item was made: {food.date}
                  </Typography>
                  <Typography>
                    Length of time can be kept in fridge and be served:
                    {food.lengthOfTime}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant='h5'
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            Drinks
          </Typography>
          {drinks.map((drink, idx) => (
            <div key={idx}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography variant='h6'>{drink.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Price: {drink.price}</Typography>
                  <Typography>
                    Level of acceptable over-coooked-ness:{' '}
                    {drink.acceptableLevel}
                  </Typography>
                  <Typography>
                    Last date where the item was made: {drink.date}
                  </Typography>
                  <Typography>
                    Length of time can be kept in fridge and be served:
                    {drink.lengthOfTime}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, null)(AlignItemsList);
