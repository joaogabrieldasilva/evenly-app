import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    author: string;
    authorProfileImage: string;
    amount: number;
    transactionId: number;
    borrowers: string[];
  }[]
>;

export async function getGroupTransactions({ groupId }: Params) {
  const response = await api.get<Response>(`/transactions/${groupId}/history`);

  return response.data;
}
