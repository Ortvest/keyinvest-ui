import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
  email: string;
  password: string;
  confirmPassword: string;
  step: number;
}

const initialState: RegistrationState = {
  email: '',
  password: '',
  confirmPassword: '',
  step: 1,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
    resetForm: () => initialState,
  },
});

export const { setEmail, setPassword, setConfirmPassword, nextStep, prevStep, resetForm } = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
