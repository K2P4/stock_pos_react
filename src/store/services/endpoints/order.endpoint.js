import { Apiservice } from "../ApiService";

const orderApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (formData) => ({
        url: "/order/place-order",
        method: "POST",
        body: formData,
        headers: {},
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
