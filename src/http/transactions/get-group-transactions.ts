import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    id: number;
    amount: number;
    description: string;
    category: string;
    paidBy: {
      name: string;
      profilePictureUrl: string;
    };
    createdAt: Date;
    splittedWith: {
      id: number;
      name: string;
      profilePictureUrl: string;
    }[];
  }[]
>;

export async function getGroupTransactions({ groupId }: Params) {
  const response = await api.get<Response>(`/groups/${groupId}/transactions`);

  return response.data;
}
