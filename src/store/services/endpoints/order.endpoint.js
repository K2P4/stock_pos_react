import { Apiservice } from "../ApiService";

const orderApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (item) => ({
        url: "/place-order",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {useCreateOrderMutation} = orderApi;
