import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function BasicSelect(props) {
  const { waiters, waiter, setWaiter } = props;

  const handleChange = (event) => {
    setWaiter(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='Waiter'>Waiter</InputLabel>
          <Select
            labelId='Waiter'
            id='Waiter'
            value={waiter}
            label='Waiter'
            onChange={handleChange}
          >
            {waiters &&
              waiters.map((waiter) => (
                <MenuItem value={waiter.name} key={waiter.name}>
                  {waiter.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
