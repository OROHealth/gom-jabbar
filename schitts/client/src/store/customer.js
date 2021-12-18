// ACTIONS

const SET_POSTING_STATUS = 'SET_POSTING_STATUS';

// ACTION CREATORS

export const setPostingCustomerStatus = (isPosting) => {
  return {
    type: SET_POSTING_STATUS,
    isPosting,
  };
};

// REDUCER

const reducer = (state = { isPosting: false }, action) => {
  switch (action.type) {
    case SET_POSTING_STATUS:
      return { ...state, isPosting: action.isPosting };
    default:
      return state;
  }
};

export default reducer;
