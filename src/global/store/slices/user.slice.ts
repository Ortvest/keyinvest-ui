import { UserState } from '@shared/interfaces/User.interfaces.ts';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
    isAuth: false,
    username: '',
    avatar: '',
    password: '',
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setAuthStatus(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
    },
});

export const UserReducer = UserSlice.reducer;