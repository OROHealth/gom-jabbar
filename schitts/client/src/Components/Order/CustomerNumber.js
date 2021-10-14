import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export default function SliderSizes(props) {
  function handleChangeSlider(e) {
    props.setCustomerNumber(e.target.value);
    props.setRatio(100 / e.target.value);
  }
  function handleChangeSelect(e) {
    props.setCustomerNumber(e.target.value);
    props.setRatio(100 / e.target.value);
  }

  return (
    <Box
      fullwidth
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '50px',
      }}
    >
      <Slider
        value={props.customerNumber}
        aria-label='Default'
        valueLabelDisplay='auto'
        max={15}
        onChange={(e) => handleChangeSlider(e)}
      />
      <FormControl sx={{ width: '100px' }}>
        <InputLabel id='Number'>Number</InputLabel>
        <Select
          labelId='Number'
          id='Number'
          value={props.customerNumber}
          label='Number'
          onChange={handleChangeSelect}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
