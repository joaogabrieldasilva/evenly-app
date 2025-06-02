import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<{
  total: number;
}>;

export async function getGroupTotalSpent({ groupId }: Params) {
  const response = await api.get<Response>(`groups/${groupId}/total-spent`);

  return response.data;
}
