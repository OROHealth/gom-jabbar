import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {
  setWaiterState,
  addItemToStore,
  setItemState,
  setFeedbackState,
  addFeedbackToStore,
  setOrderState,
  setCustomerState,
} from './utils/reducerFunctions';

// ACTIONS

const GET_WAITERS = 'GET_WAITERS';
const GET_ITEMS = 'GET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const GET_FEEDBACK = 'GET_FEEDBACK';
const ADD_FEEDBACK = 'ADD_FEEDBACK';
const GET_ORDERS = 'GET_ORDERS';
const GET_CUSTOMERS = 'GET_CUSTOMERS';

// ACTION CREATORS

export const gotWaiters = (waiters) => {
  return {
    type: GET_WAITERS,
    waiters,
  };
};

export const gotItems = (items, drinks, food, mocktails) => {
  return {
    type: GET_ITEMS,
    payload: { items, drinks, food, mocktails },
  };
};

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

export const gotFeedback = (feedback) => {
  return {
    type: GET_FEEDBACK,
    feedback,
  };
};

export const addFeedback = (feedback) => {
  return {
    type: ADD_FEEDBACK,
    feedback,
  };
};

export const gotOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

export const gotCustomers = (customers) => {
  return {
    type: GET_CUSTOMERS,
    customers,
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_WAITERS:
      return setWaiterState(state, action.waiters);
    case GET_ITEMS:
      return setItemState(state, action.payload);
    case ADD_ITEM:
      return addItemToStore(state, action.item);
    case GET_FEEDBACK:
      return setFeedbackState(state, action.feedback);
    case ADD_FEEDBACK:
      return addFeedbackToStore(state, action.feedback);
    case GET_ORDERS:
      return setOrderState(state, action.orders);
    case GET_CUSTOMERS:
      return setCustomerState(state, action.customers);
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
