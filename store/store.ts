import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});
export const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
