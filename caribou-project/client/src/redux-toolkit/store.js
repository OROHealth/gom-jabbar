import { configureStore } from '@reduxjs/toolkit';

// import the reducers
// user
import userReducer from '@redux/reducers/user/user.reducer';
import mapReducer from '@redux/reducers/map/map.reducer';
import locationsFoundReducer from '@redux/reducers/locationsFound/locationsFound.reducer';
import antlerExchangeMeetingReducer from '@redux/reducers/antlerExchangeCaribousMeeting/antlerExchangeMeeting.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
    locationsFound: locationsFoundReducer,
    antlerCaribouToMeeting: antlerExchangeMeetingReducer,
  },
});
