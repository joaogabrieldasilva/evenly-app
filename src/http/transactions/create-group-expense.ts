import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
  description?: string;
  category?: string;
  amount: number;
  payerId: number;
  splittedWithIds: number[];
  createdAt?: string;
};

type Response = ApiResponse<{
  id: number;
}>;

export async function createGroupExpense({
  groupId,
  amount,
  payerId,
  splittedWithIds,
  category,
  createdAt,
  description,
}: Params) {
  const response = await api.post<Response>(`/groups/${groupId}/transactions`, {
    amount,
    splittedWithIds,
    category,
    createdAt,
    description,
    payerId,
  });

  return response.data;
}
