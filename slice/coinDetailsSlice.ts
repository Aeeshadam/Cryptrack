import { CoinDetailsProps, CoinDetailsState } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoinDetails = createAsyncThunk<CoinDetailsProps, string>(
  "coin/getCoinDetails",
  async (slug) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-TubDjhxJxwyEcPmgwD2UPRJH",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&community_data=false&developer_data=false`,
        options
      );
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
