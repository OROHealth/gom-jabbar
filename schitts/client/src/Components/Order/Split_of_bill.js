import * as React from 'react';
import { FormLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function ColorToggleButton(props) {
  const handleChange = (event, newAlignment) => {
    props.setSplitType(newAlignment);
  };

  const ratio = JSON.stringify(props.ratio);

  return (
    <>
      <FormLabel sx={{ margin: '10px auto' }}>Split of Bill</FormLabel>
      <ToggleButtonGroup
        color='primary'
        value={props.splitType}
        exclusive
        onChange={handleChange}
        sx={{ margin: '0 auto' }}
      >
        <ToggleButton value='group'>Group: 100%</ToggleButton>
        <ToggleButton value='person'>
          Per person: {ratio.substring(0, 5)}%
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
