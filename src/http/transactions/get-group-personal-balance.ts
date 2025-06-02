import { api, ApiResponse } from "../api";

type Params = {
  groupId: number;
};

type Response = ApiResponse<
  {
    id: number;
    name: string;
    profileImage: string;
    amount: number;
  }[]
>;

export async function getGroupPersonalBalance({ groupId }: Params) {
  const response = await api.get<Response>(
    `/groups/${groupId}/personal-balance`
  );

  return response.data;
}
