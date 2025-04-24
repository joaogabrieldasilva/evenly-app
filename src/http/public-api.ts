import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

export type ApiResponse<T> = T;

export const publicApi = axios.create({
  baseURL: BASE_URL,
});

publicApi.interceptors.request.use(async (request) => {
  console.log(request.url);

  return request;
});
