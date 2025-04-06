import { getGroupDetails } from "@/src/http/transactions/get-group-details";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

type Params = {
  groupId: number;
};

export function useGroupDetails({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.details(groupId),
    queryFn: async () => await getGroupDetails({ groupId }),
  });
}
