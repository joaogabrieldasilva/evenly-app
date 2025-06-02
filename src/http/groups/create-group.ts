import { api, ApiResponse } from "../api";

type Params = {
  name: string;
  description: string;
};

type Response = ApiResponse<{
  groupId: number;
}>;

export async function createGroup({ name, description }: Params) {
  const response = await api.post<Response>("groups", {
    name,
    description,
  });

  return response.data;
}
