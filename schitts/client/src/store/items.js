import { clearFocus } from './utils/reducerFunctions';

// ACTIONS

const GET_ALL_ITEMS = 'GET_ALL_ITEMS';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const CLEAR_ITEM_FOCUS = 'CLEAR_ITEM_FOCUS';

// ACTION CREATORS

export const gotAllItems = (allItems) => {
  return {
    type: GET_ALL_ITEMS,
    allItems,
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

export const clearItemFocus = () => ({
  type: CLEAR_ITEM_FOCUS,
});

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return action.allItems;
    case CLEAR_ITEM_FOCUS:
      return clearFocus(state);
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export default reducer;
