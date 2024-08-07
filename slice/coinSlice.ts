import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CoinState, CoinProps } from "@/types";

export const fetchCoins = createAsyncThunk<CoinProps[]>(
  "coins/getAllCoins",
  async () => {
    const allCoins: CoinProps[] = [];
    const perPage = 200;
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${perPage}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coins");
      }
      const data = await response.json();
      console.log(data);
      allCoins.push(...data);
      if (page > 4) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allCoins;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.loading = false;
      state.coins = action.payload;
    });
    builder.addCase(fetchCoins.pending, (state) => {
      state.loading = true;
    });
  },
});

export default coinSlice.reducer;
