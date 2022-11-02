import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const endpoints = createApi({
  reducerPath: 'jsjoias/api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    findTickets: builder.query({
      query: (params) => ({
        url: `tickets`,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useFindTicketsQuery } = endpoints;
export default endpoints;
