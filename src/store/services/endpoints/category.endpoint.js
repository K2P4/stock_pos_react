import { Apiservice } from "../ApiService";

const categoryApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({
        search = "",
        page = 1,
        perpage = 10,
        time = "",
        sort = "desc",
      }) => ({
        url: `/category?search=${search}&page=${page}&perpage=${perpage}&time=${time}&sort=${sort}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    exportCategory: builder.query({
      query: () => ({
        url: "/category/export",
        method: "GET",
        responseHandler: async (response) => {
          return response.blob();
        },
      }),

      serializeQueryArgs: () => null,
      transformResponse: (response) => response,
    }),

    importCategory: builder.mutation({
      query: (file) => ({
        url: "/category/import",
        method: "POST",
        body: file,
        headers: {},
      }),
      invalidatesTags: ["category"],
    }),

    detailCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/category",
        method: "POST",
        body: formData,
        headers: {},
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useDetailCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useImportCategoryMutation,
  useLazyExportCategoryQuery,
} = categoryApi;
