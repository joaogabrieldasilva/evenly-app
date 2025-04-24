import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    id: number;
    name: string;
    profileImage: string;
    hasToPay: number;
    hasToReceive: number;
  }[]
>;

export async function getGroupTransactionsBalance({ groupId }: Params) {
  const response = await api.get<Response>(
    `/groups/${groupId}/transactions-balance`
  );

  return response.data;
}
