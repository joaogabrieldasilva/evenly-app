import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<{
  categoryCount: number;
}>;

export async function getGroupCategoryCount({ groupId }: Params) {
  const response = await api.get<Response>(`groups/${groupId}/category-count`);

  return response.data;
}
