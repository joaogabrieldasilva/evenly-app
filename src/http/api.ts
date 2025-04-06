import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

export type ApiResponse<T> = T;

export const api = axios.create({
  baseURL: BASE_URL,
});
