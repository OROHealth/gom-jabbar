import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Box, TextField, Typography, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchUsers, register } from '../store/utils/thunkCreators';
import { gotUser } from '../store/user';
import CircularProgress from '@mui/material/CircularProgress';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '175px',
  width: '375px',
  background: 'black',
  color: '#F1C70F',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
};

const UserButton = styled(Button)({
  height: '80px',
  background: '#8931FE',
  color: '#F4D74D',
  fontSize: '1.5rem',
  '&:hover': {
    background: '#A665FE',
  },
});

const AddButton = styled(Button)({
  background: 'black',
  color: '#F1C70F',
  '&:hover': {
    background: '#8931FE',
  },
  width: '100%',
});

const Login = (props) => {
  const { fetchUsers, user, gotUser, register } = props;
  const [newUsername, setNewUsername] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (user.isPosting === 'success') {
      setNewUsername('');
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        user.isPosting = false;
      }, 1500);
    }
  }, [user, user.isPosting]);

  const handleClose = () => setOpen(false);

  const handleClick = (event) => {
    const username = event.target.innerText;
    gotUser(username);
  };

  const handleChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = {
      date: Date.now(),
      username: newUsername,
    };
    await register(reqBody);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalBoxStyle}>
          <Typography variant='h4'>User added</Typography>
        </Box>
      </Modal>
      <Grid container spacing={1}>
        {user.allUsers ? (
          user.allUsers.map((user) => (
            <Grid item xs={4} key={user.username}>
              <UserButton fullWidth onClick={handleClick}>
                {user.username}
              </UserButton>
            </Grid>
          ))
        ) : (
          <>
            <CircularProgress
              color='secondary'
              sx={{ display: user.isFetching ? 'block' : 'none' }}
            />
            <Typography
              sx={{
                display: !user.isFetching ? 'block' : 'none',
                margin: '0 auto',
              }}
              variant='h4'
              color='error'
            >
              Something went wrong
            </Typography>
          </>
        )}
        <Grid item xs={12}>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            autoComplete='off'
            sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 1 }}
          >
            <TextField
              fullWidth
              id='filled-basic'
              label='Not on the list?'
              variant='filled'
              value={newUsername}
              onChange={handleChange}
            />
            <Box sx={{ position: 'relative', width: '100%' }}>
              <AddButton
                type='submit'
                sx={{ opacity: user.isPosting === true ? '0.1' : '1' }}
                disabled={user.isPosting === true ? true : false}
              >
                {user.isPosting === 'Something went wrong'
                  ? 'Try Again'
                  : 'Submit'}
              </AddButton>
              {user.isPosting === true && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '0',
                    left: '50%',
                    marginTop: '5px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    gotUser: (user) => {
      dispatch(gotUser(user));
    },
    register: (user) => {
      dispatch(register(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
