import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  avatarImage: '',
  email: '',
  loggedIn: false,
};

const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { accessToken, refreshToken, avatarImage, email, loggedIn } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.avatarImage = avatarImage;
      state.email = email;
      state.loggedIn = loggedIn;
    },
    removeUser: (state, _action) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.avatarImage = '';
      state.email = '';
      state.loggedIn = '';
    },
  },
});

export const { addUser, removeUser } = userReducerSlice.actions;
export default userReducerSlice.reducer;
