import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@shared/interfaces/Auth.interfaces';

interface RegisterState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  user: null,
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = registerSlice.actions;
export const RegisterReducer = registerSlice.reducer;
