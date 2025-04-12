import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity, UserState } from '@shared/interfaces/User.interfaces';

const initialState: UserState = {
  isAuth: false,
  user: {} as UserEntity,
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setAuthStatus(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUserData(state, action: PayloadAction<UserEntity>) {
      state.user = action.payload;
    },
  },
});

export const UserReducer = UserSlice.reducer;
export const { setAuthStatus, setUserData } = UserSlice.actions;
