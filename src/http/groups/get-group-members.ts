import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    id: number;
    name: string;
    profileImage: string;
  }[]
>;

export async function getGroupMembers({ groupId }: Params) {
  const response = await api.get<Response>(`groups/${groupId}/users`);

  return response.data;
}
