import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_ENDPOINTS = {
  SEND_PASSWORD_RESET: '/api/auth/send-password-reset',
};

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1000' }),
  endpoints: () => ({}),
});
