import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, FormLabel, FormControl, List, ListItemText } from '@mui/material';

function DrinksEvolution(props) {
  const { orders, items } = props;
  const [alexisDrinks, setAlexisDrinks] = useState([]);
  const [davidDrinks, setDavidDrinks] = useState([]);
  const [together, setTogether] = useState([]);

  useEffect(() => {
    if (orders) {
      function evolutionAlexis() {
        // filter Alexis orders
        const filter = orders.filter((a) => a.waiter === 'Alexis');
        // drinks count per day
        let count = 0;
        let day = 0;
        for (let i = 0; i < filter.length; i++) {
          for (let j = 0; j < items.length; j++) {
            if (filter[i].item === items[j].name && items[j].type === 'Drink') {
              count++;
              day = new Date(filter[i].date).getDay();
            }
            if (new Date(filter[i].date).getDay() !== day) {
              setAlexisDrinks([...alexisDrinks, { count: count, day: day }]);
              count = 0;
            }
            if (i === filter.length - 1) {
              setAlexisDrinks([...alexisDrinks, { count: count, day: day }]);
            }
          }
        }
      }

      function evolutionDavid() {
        // filter David orders
        const filter = orders.filter((a) => a.waiter === 'David');
        // drinks count per day
        let count = 0;
        let day = 0;
        for (let i = 0; i < filter.length; i++) {
          for (let j = 0; j < items.length; j++) {
            if (filter[i].item === items[j].name && items[j].type === 'Drink') {
              count++;
              day = new Date(filter[i].date).getDay();
            }
            if (new Date(filter[i].date).getDay() !== day) {
              setDavidDrinks([...davidDrinks, { count: count, day: day }]);
              count = 0;
            }
            if (i === filter.length - 1) {
              setDavidDrinks([...davidDrinks, { count: count, day: day }]);
            }
          }
        }
      }

      function evolutionTogether() {
        // filter Alexis orders
        const filter = orders.filter(
          (a) => a.waiter === 'Alexis' || a.waiter === 'David'
        );
        // drinks count per day
        let count = 0;
        let day = 0;
        for (let i = 0; i < filter.length; i++) {
          for (let j = 0; j < items.length; j++) {
            if (filter[i].item === items[j].name && items[j].type === 'Drink') {
              count++;
              day = new Date(filter[i].date).getDay();
            }
            if (new Date(filter[i].date).getDay() !== day) {
              setTogether([...together, { count: count, day: day }]);
              count = 0;
            }
            if (i === filter.length - 1) {
              setTogether([...together, { count: count, day: day }]);
            }
          }
        }
      }
      evolutionAlexis();
      evolutionDavid();
      evolutionTogether();
    }
  }, [alexisDrinks, davidDrinks, items, orders, together]);

  return (
    <>
      <FormLabel sx={{ margin: '0 auto' }}>
        Number of drinks over time
      </FormLabel>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <FormControl>
          <h1>Alexis</h1>
          {alexisDrinks.map((a, index) => (
            <List key={index}>
              <ListItemText primary='Number of drinks' secondary={a.count} />
              <ListItemText primary='Day' secondary={a.day} />
            </List>
          ))}
        </FormControl>
        <FormControl>
          <h1>David</h1>
          {davidDrinks.map((a, index) => (
            <List key={index}>
              <ListItemText primary='Number of drinks' secondary={a.count} />
              <ListItemText primary='Day' secondary={a.day} />
            </List>
          ))}
        </FormControl>
        <FormControl>
          <h1>Together</h1>
          {together.map((a, index) => (
            <List key={index}>
              <ListItemText primary='Number of drinks' secondary={a.count} />
              <ListItemText primary='Day' secondary={a.day} />
            </List>
          ))}
        </FormControl>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    items: state.items,
  };
};

export default connect(mapStateToProps, null)(DrinksEvolution);
