import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  avatarColor: '',
  profileImage: '',
};

const userReducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { username, email, password, avatarColor, profileImage } = action.payload;
      state.username = username;
      state.email = email;
      state.password = password;
      state.avatarColor = avatarColor;
      state.profileImage = profileImage;
    },
    removeUser: (state, _action) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.avatarColor = '';
      state.profileImage = '';
    },
  },
});

export const { addUser, removeUser } = userReducerSlice.actions;
export default userReducerSlice.reducer;
