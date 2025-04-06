import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<{
  groups: {
    id: number;
    name: string;
    description: string;
    members: string[];
    totalExpenses: number;
  }[];
  nextCursor: number | null;
}>;

export async function getGroupDetails({ groupId }: Params) {
  const response = await api.get<Response>(`/groups/${groupId}`);

  return response.data;
}
