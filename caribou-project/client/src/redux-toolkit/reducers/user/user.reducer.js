import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  avatarImage: '',
  loggedIn: false,
};

const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { accessToken, refreshToken, avatarImage, loggedIn } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.avatarImage = avatarImage;
      state.loggedIn = loggedIn;
    },
    removeUser: (state, _action) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.avatarImage = '';
      state.loggedIn = false;
    },
  },
});

export const { addUser, removeUser } = userReducerSlice.actions;
export default userReducerSlice.reducer;
