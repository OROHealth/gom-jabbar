import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const locationsFoundSlice = createSlice({
  name: 'locationsFound',
  initialState,
  reducers: {
    addLocationsFound: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export const { addLocationsFound } = locationsFoundSlice.actions;
export default locationsFoundSlice.reducer;
