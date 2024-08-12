import { combineReducers } from "@reduxjs/toolkit";
import coinListReducer from "../slice/coinListSlice";
import paginationReducer from "@/slice/paginationSlice";
import coinDetailsReducer from "@/slice/coinDetailsSlice";

const rootReducer = combineReducers({
  coinList: coinListReducer,
  pagination: paginationReducer,
  coinDetails: coinDetailsReducer,
});

export default rootReducer;
