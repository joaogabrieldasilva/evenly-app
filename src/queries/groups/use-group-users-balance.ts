import { getGroupUsersBalance } from "@/src/http/groups/get-group-users-balance";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

type Params = {
  groupId: number;
};

export function useGroupUsersBalance({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.usersBalance(groupId),
    queryFn: async () => await getGroupUsersBalance({ groupId }),
  });
}
