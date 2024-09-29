import coinDetailsReducer from "@/slice/coinDetailsSlice";
import historicDataReducer from "@/slice/historicDataSlice";
import paginationReducer from "@/slice/paginationSlice";
import portfolioReducer from "@/slice/portfolioSlice";
import { combineReducers } from "@reduxjs/toolkit";

import coinListReducer from "../slice/coinListSlice";

const rootReducer = combineReducers({
  coinList: coinListReducer,
  pagination: paginationReducer,
  coinDetails: coinDetailsReducer,
  portfolio: portfolioReducer,
  historicData: historicDataReducer,
});

export default rootReducer;
