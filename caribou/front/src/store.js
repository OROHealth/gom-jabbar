import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunkMiddleware from 'redux-thunk'

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";

import reducers from "./reducers";

const persistConfig = {
  key: "myReactUserListApp",
  storage,
  blacklist: ["modal"]
};

const store = createStore(
  persistCombineReducers(persistConfig, reducers),
  undefined,
  applyMiddleware(thunkMiddleware, logger)
);
const persistor = persistStore(store);

export { store, persistor };
