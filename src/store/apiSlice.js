import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333/',
    prepareHeaders: (headers) => {
      const token = sessionStorage.token;

      if (token) {
        headers.set('authorization', ` ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => `clients`,
      providesTags: ['Clients'],
    }),

    login: builder.mutation({
      query: (user) => ({
        url: '/user/login',
        method: 'POST',
        body: user,
      }),
    }),

    getClient: builder.mutation({
      query: (id) => ({
        url: `clients/get`,
        method: 'POST',
        body: id,
      }),
      invalidatesTags: ['Clients'],
    }),

    addClient: builder.mutation({
      query: (client) => ({
        url: `clients/add`,
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['Clients'],
    }),
    editClient: builder.mutation({
      query: (client) => ({
        url: `clients/edit`,
        method: 'PUT',
        body: client,
      }),
      invalidatesTags: ['Clients'],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/remove?id=${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Clients'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientMutation,
  useAddClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
  useLoginMutation,
} = apiSlice;
