import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({}),
});
