import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppState } from "@/store/store";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const defaultState: Partial<AppState> = {
  coinList: {
    coins: [],
    loading: false,
    error: null,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 15,
  },
  coinDetails: {
    coin: {},
    loading: false,
    error: null,
  },
};

const theme = createTheme();

export function renderWithRedux(
  ui: React.ReactElement,
  {
    currentState,
    store,
  }: { currentState?: Partial<AppState>; store?: any } = {}
) {
  const testStore =
    store ||
    configureStore({
      reducer: {
        coinList: (state = defaultState.coinList, action) => state,
        pagination: (state = defaultState.pagination, action) => state,
        coinDetails: (state = defaultState.coinDetails, action) => state,
      },
      preloadedState: {
        ...defaultState,
        ...currentState,
      },
    });

  interface WrapperProps {
    children: ReactNode;
  }

  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <Provider store={testStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    store: testStore,
  };
}
