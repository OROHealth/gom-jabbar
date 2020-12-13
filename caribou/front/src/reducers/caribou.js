import * as R from "ramda";

const initialState = {
  list: [],
};

const CaribouReducer = function(previousState = initialState, action) {
  const newState = R.clone(previousState);
  switch (action.type) {
    case "CARIBOUS_RETRIEVED":
      return R.assoc("list", action.data, newState);
    default:
      return previousState;
  }
};

export default CaribouReducer;
