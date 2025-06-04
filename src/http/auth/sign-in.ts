import { AuthUser } from "@/src/models/User";
import { api, ApiResponse } from "../api";
import { publicApi } from "../public-api";

type Params = {
  email: string;
  password: string;
};

type Response = ApiResponse<{
  user: AuthUser;
  auth: {
    token: string;
    refreshToken: string;
  };
}>;

export async function signIn({ email, password }: Params) {
  const response = await publicApi.post<Response>("/auth/sign-in", {
    email,
    password,
  });

  return response.data;
}
