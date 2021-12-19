// ACTIONS

const SET_POSTING_STATUS_CUSTOMER = 'SET_POSTING_STATUS_CUSTOMER';

// ACTION CREATORS

export const setPostingCustomerStatus = (isPosting) => {
  return {
    type: SET_POSTING_STATUS_CUSTOMER,
    isPosting,
  };
};

// REDUCER

const reducer = (state = { isPosting: false }, action) => {
  switch (action.type) {
    case SET_POSTING_STATUS_CUSTOMER:
      return { ...state, isPosting: action.isPosting };
    default:
      return state;
  }
};

export default reducer;
