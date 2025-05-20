import { BriefReducer as briefReducer } from './slices/brief.slice';
import { LoginReducer as loginReducer } from './slices/login.slice';
import { ModalReducer as modalReducer } from './slices/modal.slice';
import { RegisterReducer as registerReducer } from './slices/register.slice';
import { TemplatesReducer as templatesReducer } from './slices/templates.slice';
import { UserReducer as userReducer } from './slices/user.slice';
import { authApi } from '@global/api/auth/auth.api';
import { briefApi } from '@global/api/brief/brief.api';
import { countryApi } from '@global/api/country/country.api';
import { investmentApi } from '@global/api/templates/investmentApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    modalReducer,
    userReducer,
    briefReducer,
    login: loginReducer,
    register: registerReducer,
    [authApi.reducerPath]: authApi.reducer,
    [briefApi.reducerPath]: briefApi.reducer,
    [investmentApi.reducerPath]: investmentApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    templatesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(briefApi.middleware)
      .concat(investmentApi.middleware)
      .concat(countryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
