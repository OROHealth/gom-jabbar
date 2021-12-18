import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AlignItemsList(props) {
  const drinks = [
    { name: 'mocha', price: 4, scale: 7, date: Date.now(), time: '2 days' },
    {
      name: 'frappaccino',
      price: 5,
      scale: 7,
      date: Date.now(),
      time: '2 days',
    },
    { name: 'milk', price: 3, scale: 7, date: Date.now(), time: '2 days' },
  ];
  const foods = [
    { name: 'pizza', price: 4, scale: 7, date: Date.now(), time: '2 days' },
    { name: 'bagel', price: 5, scale: 7, date: Date.now(), time: '2 days' },
    {
      name: 'cheesecake',
      price: 3,
      scale: 7,
      date: Date.now(),
      time: '2 days',
    },
  ];

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
                    Level of acceptable over-coooked-ness: {food.scale}
                  </Typography>
                  <Typography>
                    Last date where the item was made: {food.date}
                  </Typography>
                  <Typography>
                    Length of time can be kept in fridge and be served:
                    {food.time}
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
                    Level of acceptable over-coooked-ness: {drink.scale}
                  </Typography>
                  <Typography>
                    Last date where the item was made: {drink.date}
                  </Typography>
                  <Typography>
                    Length of time can be kept in fridge and be served:
                    {drink.time}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
