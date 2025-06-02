import { getGroupCategoryCount } from "@/src/http/groups/get-group-category-count";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

type Params = {
  groupId: number;
};

export function useGroupCategoryCount({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.categoryCount(groupId),
    queryFn: async () => await getGroupCategoryCount({ groupId }),
  });
}
