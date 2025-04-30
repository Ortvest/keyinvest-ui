import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseInvestmentApi = createApi({
  reducerPath: 'investmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: () => ({}),
});
