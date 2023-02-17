import { configureStore } from '@reduxjs/toolkit';

// import the reducers
// user
import userReducer from '@redux/reducers/user/user.reducer';
import mapReducer from '@redux/reducers/map/map.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
  },
});
