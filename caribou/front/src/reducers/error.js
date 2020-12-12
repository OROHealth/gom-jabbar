import * as R from "ramda";

const initialState = {
  type: null,
  data: null,
};

const ModalReducer = function(previousState = initialState, action) {
  const newState = R.clone(previousState);
  switch (action.type) {
    case "SET_ERROR":
      return R.mergeRight(newState, {errorType: action.type, data: action.data});
    case "RESET_ERROR":
      return R.clone(initialState);
    default:
      return previousState;
  }
};

export default ModalReducer;
