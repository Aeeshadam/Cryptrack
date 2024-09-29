import { CoinDetailsProps, CoinDetailsState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCoinDetails = createAsyncThunk<CoinDetailsProps, string>(
  "coin/getCoinDetails",
  async (slug) => {
    try {
      const response = await fetch(`/api/coinDetails?slug=${slug}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch coin details");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const initialState: CoinDetailsState = {
  coin: null,
  loading: false,
  error: null,
};

const coinDetailsSlice = createSlice({
  name: "coinDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.coin = action.payload;
    });
    builder.addCase(fetchCoinDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCoinDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch coin details";
    });
  },
});

export default coinDetailsSlice.reducer;
