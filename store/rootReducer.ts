import { combineReducers } from "@reduxjs/toolkit";
import cryptoReducer from "../slice/coinSlice";
import paginationSlice from "@/slice/paginationSlice";

const rootReducer = combineReducers({
  crypto: cryptoReducer,
  pagination: paginationSlice,
});

export default rootReducer;
