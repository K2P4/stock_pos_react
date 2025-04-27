import { Apiservice } from "../ApiService";

const orderApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (item) => ({
        url: "/place-order",
        method: "POST",
<<<<<<< Updated upstream
        body: item,
=======
        body: formData,
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
>>>>>>> Stashed changes
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

<<<<<<< Updated upstream
export const {useCreateOrderMutation} = orderApi;
=======
export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useOrderDetailQuery,
  useUpdateOrderMutation
} = orderApi;
>>>>>>> Stashed changes
