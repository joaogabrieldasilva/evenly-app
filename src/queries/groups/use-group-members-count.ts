import { getGroupCategoryCount } from "@/src/http/groups/get-group-category-count";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";
import { getGroupMembersCount } from "@/src/http/groups/get-group-members-count";

type Params = {
  groupId: number;
  disabled?: boolean;
};

export function useGroupMembersCount({ groupId, disabled }: Params) {
  return useQuery({
    queryKey: groupKeys.membersCount(groupId),
    queryFn: async () => await getGroupMembersCount({ groupId }),
    enabled: !disabled,
  });
}
