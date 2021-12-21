import { useState, useEffect } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import axios from 'axios';

import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Rated = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [allCustomers, setAllCustomers] = useState([]);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const getCustomers = async () => {
      const { data } = await axios.get('/api/analytics/out-of-town-customers');
      setAllCustomers(data.allCustomers);
    };
    getCustomers();
  }, []);

  const handleChange = async (event) => {
    setSelectedCustomer(event.target.value);
    const { data } = await axios.get(
      `/api/analytics/find-customer/${event.target.value}`
    );
    setCustomer(data.customer);
  };

  return (
    <Box
      sx={{ minWidth: 120, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>
          Search for out of town Customer
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectedCustomer}
          label='Search for out of town Customer'
          onChange={handleChange}
        >
          {allCustomers &&
            allCustomers.map((customer) => (
              <MenuItem value={customer.name} key={customer.name}>
                {customer.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <List sx={{ margin: '0 auto' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EmojiFoodBeverageIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                !customer.drinkPreference
                  ? 'No preference'
                  : customer.drinkPreference
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                !customer.foodPreference
                  ? 'No preference'
                  : customer.foodPreference
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Rated;
