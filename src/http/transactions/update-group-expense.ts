import { api, ApiResponse } from "../api";

type Params = {
  transactionId: number;
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

export async function updateGroupExpense({
  transactionId,
  groupId,
  amount,
  payerId,
  splittedWithIds,
  category,
  createdAt,
  description,
}: Params) {
  const response = await api.put<Response>(
    `/groups/${groupId}/transactions/${transactionId}`,
    {
      amount,
      splittedWithIds,
      category,
      createdAt,
      description,
      payerId,
    }
  );

  return response.data;
}
