import { configureStore } from "@reduxjs/toolkit";
import { Apiservice } from "./services/ApiService";

export const store = configureStore({
  reducer: {
    [Apiservice.reducerPath]: Apiservice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Apiservice.middleware),
});
