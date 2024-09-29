import { HistoricDataProps, HistoricDataState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHistoricData = createAsyncThunk<HistoricDataProps, string>(
  "historicData/fetchHistoricData",
  async (coinId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
      );
      const data = await response.json();
      return data.prices;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: HistoricDataState = {
  data: [],
  loading: false,
  error: "",
};

const historicDataSlice = createSlice({
  name: "historicData",
  initialState,
  reducers: {
    setHistoricData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistoricData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchHistoricData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHistoricData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch historic data";
    });
  },
});

export default historicDataSlice.reducer;
