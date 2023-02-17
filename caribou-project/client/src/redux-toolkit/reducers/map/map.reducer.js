import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  range: 0,
  location: '',
};

const mapReducerSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addLocationToMap: (state, action) => {
      const { range, location } = action.payload;
      state.range = range;
      state.location = location;
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
