import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseCountryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_COUNTRY_API_URL }),
  endpoints: () => ({}),
});
