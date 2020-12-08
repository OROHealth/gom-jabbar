import * as R from "ramda";

const initialState = {
  content: null,
  isVisible: false,
};

const ModalReducer = function(previousState = initialState, action) {
  const newState = R.clone(previousState);
  switch (action.type) {
    case "SET_MODAL":
      return R.pipe(
        R.assoc("content", action.content),
        R.assoc("isVisible", true),
      )(newState);
    case "RESET_MODAL":
      return R.clone(initialState);
    default:
      return previousState;
  }
};

export default ModalReducer;
