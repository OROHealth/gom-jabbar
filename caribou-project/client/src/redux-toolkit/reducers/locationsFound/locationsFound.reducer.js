import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const locationsFoundSlice = createSlice({
  name: 'locationsFound',
  initialState,
  reducers: {
    addLocationsFound: (state, { payload }) => {
      console.log('payload Redux:', payload);
      state.push(payload);
    },
  },
  extraReducers: () => {},
});

export const { addLocationsFound } = locationsFoundSlice.actions;
export default locationsFoundSlice.reducer;
