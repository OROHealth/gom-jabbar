import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locationsAcc: 0,
};

const locationsFoundSlice = createSlice({
  name: 'locationsAcc',
  initialState,
  reducers: {
    locationsAcc: (state, action) => {
      const { locationsAcc } = action.payload;
      state.locationsAcc = locationsAcc;
    },
  },
});

export const { locationsAcc } = locationsFoundSlice.actions;
export default locationsFoundSlice.reducer;
