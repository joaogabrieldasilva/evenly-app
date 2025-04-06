import { getGroupTransactions } from "@/src/http/transactions/get-group-transactions";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

type Params = {
  groupId: number;
};

export function useGroupTransactions({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.transactions(groupId),
    queryFn: async () => await getGroupTransactions({ groupId }),
  });
}
