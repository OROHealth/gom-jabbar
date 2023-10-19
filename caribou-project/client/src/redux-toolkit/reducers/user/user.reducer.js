import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  avatarImage: '',
  loggedIn: false,
  email: '',
};

const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { accessToken, refreshToken, avatarImage, loggedIn, email } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.avatarImage = avatarImage;
      state.loggedIn = loggedIn;
      state.email = email;
    },
    removeUser: (state, _action) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.avatarImage = '';
      state.loggedIn = false;
      state.email = '';
    },
  },
});

export const { addUser, removeUser } = userReducerSlice.actions;
export default userReducerSlice.reducer;
