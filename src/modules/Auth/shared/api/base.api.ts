import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://keytrading-backend-production.up.railway.app/api' }),
  endpoints: () => ({}),
});
