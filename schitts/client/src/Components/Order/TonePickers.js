import React from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

export default function RowRadioButtonsGroup(props) {
  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Tone</FormLabel>
      <RadioGroup row aria-label='tone' name='row-radio-buttons-group'>
        <FormControlLabel
          value='angry'
          control={<Radio />}
          label='Angry'
          onClick={() => props.setTone('angry')}
        />
        <FormControlLabel
          value='happy'
          control={<Radio />}
          label='Happy'
          onClick={() => props.setTone('happy')}
        />
        <FormControlLabel
          value='overwhelmed'
          control={<Radio />}
          label='Overwhelmed'
          onClick={() => props.setTone('overwhelmed')}
        />
        <FormControlLabel
          value='pregnant'
          control={<Radio />}
          label='Pregnant'
          onClick={() => props.setTone('pregnant')}
        />
        <FormControlLabel
          value='moody'
          control={<Radio />}
          label='Moody'
          onClick={() => props.setTone('moody')}
        />
        <FormControlLabel
          value='bored'
          control={<Radio />}
          label='Bored'
          onClick={() => props.setTone('bored')}
        />
        <FormControlLabel
          value='excited'
          control={<Radio />}
          label='Excited'
          onClick={() => props.setTone('excited')}
        />
      </RadioGroup>
    </FormControl>
  );
}
