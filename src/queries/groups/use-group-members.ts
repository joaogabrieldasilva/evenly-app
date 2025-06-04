import { getGroupMembers } from "@/src/http/groups/get-group-members";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

type Params = {
  groupId: number;
};

export function useGroupMembers({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.members(groupId),
    queryFn: async () => await getGroupMembers({ groupId }),
  });
}
