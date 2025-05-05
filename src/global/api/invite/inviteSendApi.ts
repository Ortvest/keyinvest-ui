import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inviteSendApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: () => ({}),
});
