import * as React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function BasicSelect(props) {
  const { items } = props;

  const handleChange = (event) => {
    props.setItem(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='Item'>Item</InputLabel>
          <Select
            labelId='Item'
            id='Item'
            value={props.item}
            label='Item'
            onChange={handleChange}
          >
            {items &&
              items.map((items) => (
                <MenuItem value={items.name} key={items.name}>
                  {items.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
