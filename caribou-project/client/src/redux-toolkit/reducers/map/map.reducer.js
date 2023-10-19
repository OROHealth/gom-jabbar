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
    removeMap: (state, _action) => {
      state.y = '';
      state.x = '';
      state.label = '';
      state.range = 0;
    },
  },
});

export const { addLocationToMap, removeMap } = mapReducerSlice.actions;
export default mapReducerSlice.reducer;
