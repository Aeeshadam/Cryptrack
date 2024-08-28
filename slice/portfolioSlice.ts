import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PotfolioCoin } from "@/types";

interface PortfolioState {
  coins: PotfolioCoin[];
}

const initialState: PortfolioState = {
  coins: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addCoin: (state, action: PayloadAction<PotfolioCoin>) => {
      const existingCoin = state.coins.find(
        (coin) => coin.id === action.payload.id
      );
      if (existingCoin) {
        existingCoin.quantity = action.payload.quantity;
      } else {
        state.coins.push(action.payload);
      }
    },
    removeCoin: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
    },
    updateCoin: (state, action: PayloadAction<PotfolioCoin>) => {
      const existingCoin = state.coins.find(
        (coin) => coin.id === action.payload.id
      );
      if (existingCoin) {
        existingCoin.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addCoin, removeCoin, updateCoin } = portfolioSlice.actions;
export default portfolioSlice.reducer;