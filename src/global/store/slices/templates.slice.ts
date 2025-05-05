import { InvestmentPackage } from '@global/api/templates/investmentApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TemplatesState {
  packages: InvestmentPackage[];
  loading: boolean;
  error: string | null;
}

const initialState: TemplatesState = {
  packages: [],
  loading: false,
  error: null,
};

export const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    fetchPackagesSuccess(state, action: PayloadAction<InvestmentPackage[]>) {
      state.packages = action.payload;
      state.loading = false;
    },
    fetchPackagesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearPackages(state) {
      state.packages = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const { fetchPackagesSuccess, fetchPackagesFailure, clearPackages } = templatesSlice.actions;
export const TemplatesReducer = templatesSlice.reducer;
