import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const antlerExchangeCaribouMeetingSlice = createSlice({
  name: 'antlerCaribouToMeeting',
  initialState,
  reducers: {
    addAntlerExchangeCaribouToMeeting: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: () => {},
});

export const { addAntlerExchangeCaribouToMeeting } = antlerExchangeCaribouMeetingSlice.actions;
export default antlerExchangeCaribouMeetingSlice.reducer;
