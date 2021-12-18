import { addOrdersToStore } from './utils/reducerFunctions';

// ACTIONS

const ADD_ORDERS = 'ADD_ORDERS';

// ACTION CREATORS

export const gotOrders = (orders) => {
  return {
    type: ADD_ORDERS,
    orders,
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ORDERS:
      return addOrdersToStore(state, action.orders);
    default:
      return state;
  }
};

export default reducer;
