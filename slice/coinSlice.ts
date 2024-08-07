import { CoinState } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CoinProps } from "@/types";

export const fetchCoins = createAsyncThunk<CoinProps[]>(
  "coins/getAllCoins",
  async () => {
    const response = await fetch("/api/coins");
    if (!response.ok) {
      throw new Error("Failed to fetch coins");
    }
    return response.json();
  }
);

const initialState: CoinState = {
  coins: [],
  loading: false,
  error: null,
};

const coinSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<CoinProps[]>) => {
      state.coins = action.payload;
    },
  },
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

export const { setCoins } = coinSlice.actions;
export default coinSlice.reducer;
