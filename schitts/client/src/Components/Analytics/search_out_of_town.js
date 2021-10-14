import { useState } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Input,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function Search(props) {
  const { customers } = props;
  const [customerList, setCustomerList] = useState('');

  function handleChange(event) {
    // find out of town customers
    const name = event.target.value.toLowerCase();
    const out_of_town_customers = customers.filter(
      (a) =>
        a.residing === 'out of town' && a.full_name.toLowerCase().includes(name)
    );
    setCustomerList(out_of_town_customers);
  }

  return (
    <>
      <FormControl sx={{ width: '500px', marginBottom: '50px' }}>
        <InputLabel htmlFor='search'>Search out of town customer</InputLabel>
        <Input
          fullWidth
          id='search'
          aria-describedby='my-helper-text'
          onChange={handleChange}
        />
        {customerList &&
          customerList.map((a, index) => (
            <List key={index}>
              <ListItem>
                <ListItemText primary={a.full_name} />
              </ListItem>
            </List>
          ))}
      </FormControl>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
  };
};

export default connect(mapStateToProps, null)(Search);
