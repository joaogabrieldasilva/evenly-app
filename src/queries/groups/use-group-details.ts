import { getGroupDetails } from "@/src/http/groups/get-group-details";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

type Params = {
  groupId: number;
};

export function useGroupDetails({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.group(groupId),
    queryFn: async () => await getGroupDetails({ groupId }),
  });
}
