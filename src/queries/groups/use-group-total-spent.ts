import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";
import { getGroupTotalSpent } from "@/src/http/groups/get-group-total-spent";

type Params = {
  groupId: number;
};

export function useGroupTotalSpent({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.totalSpent(groupId),
    queryFn: async () => await getGroupTotalSpent({ groupId }),
  });
}
