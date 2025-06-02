import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<{
  membersCount: number;
}>;

export async function getGroupMembersCount({ groupId }: Params) {
  const response = await api.get<Response>(`groups/${groupId}/members-count`);

  return response.data;
}
