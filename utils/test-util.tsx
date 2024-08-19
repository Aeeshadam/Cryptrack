import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppState } from "@/store/store";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme();
export interface CoinDetailsState {
  coin: {
    market_data: {
      current_price: { usd: number };
      price_change_percentage_24h: number;
    };
    market_cap_rank: number;
    name: string;
    image: { large: string };
  };
  loading: boolean;
  error: string;
}
export function renderWithRedux(
  ui: React.ReactElement,
  { initialState }: { initialState?: Partial<AppState> } = {}
) {
  const store = configureStore({
    reducer: {
      coinList: (state = {}, action) => state,
      pagination: (state = {}, action) => state,
      coinDetails: (state = {}, action) => state,
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {ui}
      </ThemeProvider>
    </Provider>
  );
}
