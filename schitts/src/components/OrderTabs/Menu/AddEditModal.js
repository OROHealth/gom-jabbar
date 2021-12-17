import { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const addButtonStyle = {
  background: 'black',
  fontSize: '1.5rem',
  p: 2,
  color: '#F1C70F',
  '&:hover': {
    background: '#515151',
  },
};

const editButtonStyle = {
  background: '#8931FE',
  fontSize: '1.5rem',
  p: 2,
  color: '#F4D74D',
  '&:hover': {
    background: '#A665FE',
  },
};

const deleteButtonStyle = {
  fontSize: '1.5rem',
  p: 2,
  '&:hover': {
    background: '#EB6956',
  },
};

export default function MenuModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 7 }}>
        <Button onClick={handleOpen} sx={addButtonStyle}>
          Add item
        </Button>
        <Button onClick={handleOpen} sx={editButtonStyle}>
          Edit item
        </Button>
        <Button onClick={handleOpen} sx={deleteButtonStyle} color='error'>
          Delete item
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
