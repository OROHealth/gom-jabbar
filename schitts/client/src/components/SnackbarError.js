import React from 'react';
import { Button, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Close from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: 'red',
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
  },
}));

const SnackbarError = (props) => {
  const classes = useStyles();
  return (
    <Snackbar
      open={props.snackBarOpen}
      onClose={() => props.setSnackBarOpen(false)}
      message={
        props.errorMessage || 'Sorry, an error occured. Please try again'
      }
      action={
        <React.Fragment>
          <Button
            className={classes.icon}
            size='small'
            onClick={() => props.setSnackBarOpen(false)}
          >
            <Close color='secondary' />
          </Button>
        </React.Fragment>
      }
      ContentProps={{
        classes: {
          root: classes.snackbar,
        },
      }}
    />
  );
};

export default SnackbarError;
