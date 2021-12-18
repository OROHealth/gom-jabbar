import {
  clearFocus,
  addItemToStore,
  removeItemFromStore,
} from './utils/reducerFunctions';

// ACTIONS

const GET_ALL_ITEMS = 'GET_ALL_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_POSTING_STATUS = 'SET_POSTING_STATUS';
const CLEAR_ITEM_FOCUS = 'CLEAR_ITEM_FOCUS';

// ACTION CREATORS

export const gotAllItems = (allItems) => {
  return {
    type: GET_ALL_ITEMS,
    allItems,
  };
};

export const gotItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

export const removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    item,
  };
};

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

export const setPostingItemStatus = (isPosting) => {
  return {
    type: SET_POSTING_STATUS,
    isPosting,
  };
};

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
    case ADD_ITEM:
      return addItemToStore(state, action.item);
    case REMOVE_ITEM:
      return removeItemFromStore(state, action.item);
    case SET_POSTING_STATUS:
      return { ...state, isPosting: action.isPosting };
    case SET_FETCHING_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
        isPosting: false,
      };
    default:
      return state;
  }
};

export default reducer;
