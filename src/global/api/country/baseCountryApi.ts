import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseCountryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://restcountries.com/v3.1/',
  }),
  endpoints: () => ({}),
});
