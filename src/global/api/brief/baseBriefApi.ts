import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseBriefApi = createApi({
  reducerPath: 'briefApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: () => ({}),
});
