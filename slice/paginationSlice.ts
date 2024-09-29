import { PaginationState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 15,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
