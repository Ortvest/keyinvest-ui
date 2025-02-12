import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_ENDPOINTS = {
  SEND_PASSWORD_RESET: 'auth/send-password-reset',
} as const;

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1000/api/' }),
  endpoints: () => ({}),
});
