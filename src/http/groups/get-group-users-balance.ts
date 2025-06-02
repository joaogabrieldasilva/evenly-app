import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    id: number;
    name: string;
    profileImage: string;
    balance: number;
  }[]
>;

export async function getGroupUsersBalance({ groupId }: Params) {
  const response = await api.get<Response>(`groups/${groupId}/users/balance`);

  return response.data;
}
