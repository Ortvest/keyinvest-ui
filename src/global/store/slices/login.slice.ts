import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  email: string;
  region: string;
}

interface LoginState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
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

export const { setUser, clearUser, setLoading, setError } = loginSlice.actions;

export const LoginReducer = loginSlice.reducer;
