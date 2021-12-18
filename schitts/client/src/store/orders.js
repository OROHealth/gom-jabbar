import { addOrdersToStore } from './utils/reducerFunctions';

// ACTIONS

const ADD_ORDERS = 'ADD_ORDERS';
const SET_POSTING_STATUS = 'SET_POSTING_STATUS';

// ACTION CREATORS

export const gotOrders = (orders) => {
  return {
    type: ADD_ORDERS,
    orders,
  };
};

export const setPostingOrderStatus = (isPosting) => {
  return {
    type: SET_POSTING_STATUS,
    isPosting,
  };
};

// REDUCER

const reducer = (state = { isPosting: false }, action) => {
  switch (action.type) {
    case ADD_ORDERS:
      return addOrdersToStore(state, action.orders);
    case SET_POSTING_STATUS:
      return { ...state, isPosting: action.isPosting };
    default:
      return state;
  }
};

export default reducer;
