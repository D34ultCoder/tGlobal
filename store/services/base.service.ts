import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Platform } from "react-native";

const BASE_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL ||
  (Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000");

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const baseService = createApi({
  reducerPath: "baseService",
  baseQuery,
  tagTypes: ["Patients"],
  endpoints: () => ({}),
});
