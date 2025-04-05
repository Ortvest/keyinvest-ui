import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StocksPicks } from '@shared/interfaces/Brief.interfaces';

interface BriefState {
  stockPicks: StocksPicks;
}

const initialState: BriefState = {
  stockPicks: {
    companies: [],
    brokers: [],
  },
};

const briefSlice = createSlice({
  name: 'brief',
  initialState,
  reducers: {
    setStockPicks: (state, action: PayloadAction<StocksPicks>) => {
      state.stockPicks = action.payload;
    },
  },
});

export const { setStockPicks } = briefSlice.actions;

export const BriefReducer = briefSlice.reducer;
