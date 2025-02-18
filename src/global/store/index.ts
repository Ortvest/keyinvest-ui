import { authApi } from '@modules/Auth/shared/api/auth.api';

import { ModalReducer as modalReducer } from './slices/modal.slice';
import { UserReducer as userReducer } from './slices/user.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
