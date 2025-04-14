import { Apiservice } from "../ApiService";

const deliveryApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryInformation: builder.query({
      query: () => ({
        url: "/cart/check-out",
        method: "GET",
      }),
      providesTags: ["delivery"],
    }),

    getDelieryDetail: builder.query({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "GET",
      }),
      providesTags: ["delivery"],
    }),

    createDelivery: builder.mutation({
      query: (formData) => ({
        url: "/cart/check-out",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["delivery"],
    }),
  }),
});

export const { useGetDeliveryInformationQuery, useCreateDeliveryMutation, useGetDelieryDetailQuery } =
  deliveryApi;
