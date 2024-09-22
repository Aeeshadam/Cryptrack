import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioCoin, PortfolioState, Transaction } from "@/types";

const initialState: PortfolioState = {
  coins: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addCoin: (state, action: PayloadAction<PortfolioCoin>) => {
      const existingCoin = state.coins.find(
        (coin) => coin.id === action.payload.id
      );
      if (existingCoin) {
        existingCoin.quantity = action.payload.quantity;
        const transactionMap = new Map<number, Transaction>();
        existingCoin.transactions.forEach((transaction) =>
          transactionMap.set(transaction.timestamp, transaction)
        );
        action.payload.transactions.forEach((transaction) =>
          transactionMap.set(transaction.timestamp, transaction)
        );

        existingCoin.transactions = Array.from(transactionMap.values());
      } else {
        state.coins.push(action.payload);
      }
    },
    removeCoin: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
    },
    updateCoin: (state, action: PayloadAction<PortfolioCoin>) => {
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
