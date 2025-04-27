import { Apiservice } from "../ApiService";

const orderApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (item) => ({
        url: "/order/place-order",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["order"],
    }),

    getOrders: builder.query({
      query: ({
        search = "",
        page = 1,
        perpage = 10,
        time = "",
        sort = "desc",
        status = 7,
      }) => ({
        url: `/order?search=${search}&page=${page}&perpage=${perpage}&date=${time}&sort=${sort}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    orderDetail: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    updateOrder: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/order/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useOrderDetailQuery,
  useUpdateOrderMutation,
} = orderApi;
