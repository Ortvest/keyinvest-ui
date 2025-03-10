import { LoginReducer as loginReducer } from './slices/login.slice';
import { ModalReducer as modalReducer } from './slices/modal.slice';
import { RegisterReducer as registerReducer } from './slices/register.slice';
import { UserReducer as userReducer } from './slices/user.slice';
import { authApi } from '@global/api/auth.api';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
    login: loginReducer,
    register: registerReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
