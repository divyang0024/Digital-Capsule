import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer.js";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  user: userReducer.reducer,
});

let intialState = {};
const middleware = [thunk];

const store = configureStore(
  { reducer: rootReducer },
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;