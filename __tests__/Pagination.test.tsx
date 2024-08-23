import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import PaginationRounded from "../components/Pagination";

const initialState = {
  coinList: {
    coins: Array(50).fill({ id: "ethereum", name: "ethereum" }),
    loading: false,
    error: null,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
  },
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

const { reducer: paginationReducer, actions: paginationActions } =
  paginationSlice;

const store = configureStore({
  reducer: {
    coinList: (state = initialState.coinList) => state,
    pagination: paginationReducer,
  },
  preloadedState: initialState,
});

describe("PaginationRounded Component", () => {
  it("renders PaginationRounded and handles page change", () => {
    render(
      <Provider store={store}>
        <PaginationRounded />
      </Provider>
    );

    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();

    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(7); // Includes 5 page buttons + 2 for previous and next

    const page2Button = screen.getByRole("button", { name: "Go to page 2" });
    expect(page2Button).toBeInTheDocument();
    fireEvent.click(page2Button);

    const newState = store.getState();
    expect(newState.pagination.currentPage).toBe(2);
  });
});
