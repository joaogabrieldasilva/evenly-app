import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
  transactionId: number;
};

type PaidBy = {
  id: number;
  name: string;
  profilePictureUrl: string;
};

type SplittedWithMember = {
  id: number;
  name: string;
  profilePictureUrl: string;
};

type Expense = {
  id: number;
  amount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  paidBy: PaidBy;
  splittedWithMembers: SplittedWithMember[];
  category: string;
};

type Response = ApiResponse<Expense>;

export async function getGroupTransaction({ groupId, transactionId }: Params) {
  const response = await api.get<Response>(
    `/groups/${groupId}/transactions/${transactionId}`
  );

  return response.data;
}
