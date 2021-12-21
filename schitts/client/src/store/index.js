import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// temporary dev
// import loggerMiddleware from 'redux-logger';

import user from './user';
import orders from './orders';
import items from './items';
import customer from './customer';

const appReducer = combineReducers({
  user,
  orders,
  items,
  customer,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
    // loggerMiddleware
  )
);
