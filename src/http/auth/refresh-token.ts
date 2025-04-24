import { api, ApiResponse } from "../api";
import { publicApi } from "../public-api";

type Params = {
  refreshToken: string;
};

type Response = ApiResponse<{
  authToken: string;
  refreshToken: string;
}>;

export async function refreshToken({ refreshToken }: Params) {
  const response = await publicApi.post<Response>(
    "/auth/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  return response.data;
}
