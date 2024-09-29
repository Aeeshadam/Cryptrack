import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { useTransaction } from "@/contexts/TransactionContext";
import coinDetailsReducer from "@/slice/coinDetailsSlice";
import coinListReducer from "@/slice/coinListSlice";
import historicDataReducer from "@/slice/historicDataSlice";
import paginationReducer from "@/slice/paginationSlice";
import portfolioReducer from "@/slice/portfolioSlice";
import { AppState } from "@/store/store";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";

const defaultState: AppState = {
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
  portfolio: {
    coins: [],
  },
  historicData: {
    data: [],
    loading: false,
    error: "",
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
        coinList: coinListReducer,
        pagination: paginationReducer,
        coinDetails: coinDetailsReducer,
        portfolio: portfolioReducer,
        historicData: historicDataReducer,
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

export const mockUseTransaction = (overrides = {}) => {
  const defaultValues = {
    openModal: false,
    setOpenModal: jest.fn(),
    handleOpenModal: jest.fn(),
    transactionType: "buy",
    setTransactionType: jest.fn(),
    calculateTotal: jest.fn(() => "0.00"),
    handleTransactionTypeChange: jest.fn(),
    quantity: 0,
    setQuantity: jest.fn(),
    selectedCoin: null,
    setSelectedCoin: jest.fn(),
    pricePerCoin: 0,
    setPricePerCoin: jest.fn(),
  };

  (useTransaction as jest.Mock).mockReturnValue({
    ...defaultValues,
    ...overrides,
  });
};
