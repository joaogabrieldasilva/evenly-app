import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    category: string;
    amount: number;
  }[]
>;

export async function getGroupCategoryReport({ groupId }: Params) {
  const response = await api.get<Response>(
    `/transactions/${groupId}/category-report`
  );

  return response.data;
}
