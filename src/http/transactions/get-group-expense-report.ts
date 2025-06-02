import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    userId: number;
    userName: string;
    amount: number;
  }[]
>;

export async function getGroupExpenseReport({ groupId }: Params) {
  const response = await api.get<Response>(
    `/transactions/${groupId}/expense-report`
  );

  return response.data;
}
