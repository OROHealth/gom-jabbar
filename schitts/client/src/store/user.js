import { addUserToStore } from './utils/reducerFunctions';

// ACTIONS

const ADD_USER = 'ADD_USER';
const GET_USER = 'GET_USER';
const GET_ALL_USERS = 'GET_ALL_USER';
const SET_FETCHING_STATUS_USER = 'SET_FETCHING_STATUS_USER';
const CLEAR_ON_LOGOUT = 'CLEAR_ON_LOGOUT';
const SET_POSTING_STATUS_USER = 'SET_POSTING_STATUS_USER';

// ACTION CREATORS

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const gotUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const gotAllUsers = (allUsers) => {
  return {
    type: GET_ALL_USERS,
    allUsers,
  };
};

export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT,
  };
};

export const setFetchingStatusUser = (isFetching) => ({
  type: SET_FETCHING_STATUS_USER,
  isFetching,
});

export const setPostingUserStatus = (isPosting) => {
  return {
    type: SET_POSTING_STATUS_USER,
    isPosting,
  };
};

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case ADD_USER:
      return addUserToStore(state, action.user);
    case GET_USER:
      return { ...state, activeUser: action.user };
    case GET_ALL_USERS:
      return action.allUsers;
    case CLEAR_ON_LOGOUT:
      return { ...state, activeUser: null };
    case SET_POSTING_STATUS_USER:
      return { ...state, isPosting: action.isPosting };
    case SET_FETCHING_STATUS_USER:
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
