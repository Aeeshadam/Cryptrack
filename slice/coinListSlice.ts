import { CoinListProps, CoinListState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCoins = createAsyncThunk<CoinListProps[]>(
  "coins/getAllCoins",
  async () => {
    const response = await fetch("/api/coins");
    if (!response.ok) {
      throw new Error("Failed to fetch coins");
    }
    return response.json();
  }
);

const initialState: CoinListState = {
  coins: [],
  loading: false,
  error: null,
};

const coinListSlice = createSlice({
  name: "coinList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.loading = false;
      state.coins = action.payload;
    });
    builder.addCase(fetchCoins.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoins.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch coins";
    });
  },
});

export default coinListSlice.reducer;
