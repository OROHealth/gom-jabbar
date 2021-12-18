import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// temporary dev
import loggerMiddleware from 'redux-logger';

import user from './user';
import orders from './orders';
import items from './items';

const appReducer = combineReducers({
  user,
  orders,
  items,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
