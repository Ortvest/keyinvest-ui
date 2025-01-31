// import { exampleApi } from '@global/api/example.api';

import { ModalReducer as modalReducer } from './slices/modal.slice';
import { registrationReducer } from './slices/registration.slice';
import { UserReducer as userReducer } from './slices/user.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
    registration: registrationReducer,
    // [exampleApi.reducerPath]: exampleApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exampleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
