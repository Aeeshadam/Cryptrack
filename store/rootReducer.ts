import { combineReducers } from "@reduxjs/toolkit";
import coinListReducer from "../slice/coinListSlice";
import paginationReducer from "@/slice/paginationSlice";
import coinDetailsReducer from "@/slice/coinDetailsSlice";
import portfolioReducer from "@/slice/portfolioSlice";

const rootReducer = combineReducers({
  coinList: coinListReducer,
  pagination: paginationReducer,
  coinDetails: coinDetailsReducer,
  portfolio: portfolioReducer,
});

export default rootReducer;
