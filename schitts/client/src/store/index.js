import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// temporary dev
import loggerMiddleware from 'redux-logger';

import user from './user';
import orders from './orders';

const CLEAR_ON_LOGOUT = 'CLEAR_ON_LOGOUT';

export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT,
  };
};

const appReducer = combineReducers({
  user,
  orders,
});
const rootReducer = (state, action) => {
  // if (action.type === CLEAR_ON_LOGOUT) {
  //   // return deleteActiveUser(state);
  //   return { ...state, user: delete state.user.activeUser };
  // }
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
