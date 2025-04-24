import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const BASE_URL = "http://127.0.0.1:3000";

export type ApiResponse<T> = T;

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(async (request) => {
  const authToken = await AsyncStorage.getItem("@evenly/authToken");

  console.log(request.url);

  request.headers.Authorization = `Bearer ${authToken}`;

  return request;
});
