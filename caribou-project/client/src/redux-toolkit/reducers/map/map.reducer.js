import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  y: '',
  x: '',
  label: '',
  range: 0,
};

const mapReducerSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addLocationToMap: (state, action) => {
      const { y, x, label, range } = action.payload;
      state.y = y;
      state.x = x;
      state.label = label;
      state.range = range;
    },
    // removeMap: (state, _action) => {
    //   state.accessToken = '';
    //   state.refreshToken = '';
    //   state.avatarImage = '';
    //   state.loggedIn = false;
    // },
  },
});

export const { addLocationToMap } = mapReducerSlice.actions;
export default mapReducerSlice.reducer;
