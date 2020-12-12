import * as R from "ramda";

const initialState = {
  token: null
};

const UserReducer = function(previousState = initialState, action) {
  const newState = R.clone(previousState);
  switch (action.type) {
    case "REGISTER_USER":
      return R.mergeRight(newState, action.user);
    case "REGISTER_TOKEN":
      return R.assoc("token", action.token, newState);
    case "REMOVE_TOKEN":
      return R.assoc("token", null, newState);
    default:
      return previousState;
  }
};

export default UserReducer;
