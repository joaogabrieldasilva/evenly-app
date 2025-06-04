import { api, ApiResponse } from "../api";

type Params = {
  cursor: number | null;
};

export type ApiUserGroups = {
  nextCursor: null | number;
  groups: {
    id: number;
    name: string;
    description: string;
    totalExpenses: number;
    members: {
      id: number;
      name: string;
      profileImage: string;
    }[];
  }[];
};

type Response = ApiResponse<ApiUserGroups>;

export async function getUserGroups({ cursor }: Params) {
  const response = await api.get<Response>("groups", {
    params: {
      cursor,
    },
  });

  return response.data;
}
