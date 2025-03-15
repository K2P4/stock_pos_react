import { Apiservice } from "../ApiService";

const AuthApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
        headers: {},
      }),
      invalidatesTags: ["auth"],
    }),

    register: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
        headers: {},
      }),
      invalidatesTags: ["auth"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
        headers: {},
      }),
      providesTags: ["auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        headers: {},
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLogInMutation,
  useRegisterMutation,
  useLogoutMutation,
} = AuthApi;
