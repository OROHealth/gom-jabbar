// ACTIONS

const GET_USER = 'GET_USER';
const GET_ALL_USERS = 'GET_ALL_USER';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';

// ACTION CREATORS

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

export const setFetchingStatus = (isFetching) => ({
  type: SET_FETCHING_STATUS,
  isFetching,
});

// REDUCER

const reducer = (state = { isFetching: true }, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, activeUser: action.user };
    case GET_ALL_USERS:
      return action.allUsers;
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
