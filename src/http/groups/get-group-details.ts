import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<{
  id: number;
  name: string;
  description: string;
  members: string[];
  ownerId: number;
  totalExpenses: number;
}>;

export async function getGroupDetails({ groupId }: Params) {
  const response = await api.get<Response>(`/groups/${groupId}`);

  return response.data;
}
