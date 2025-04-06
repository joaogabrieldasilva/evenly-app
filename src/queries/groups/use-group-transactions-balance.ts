import { getGroupTransactionsBalance } from "@/src/http/transactions/get-group-transactions-balance";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

type Params = {
  groupId: number;
};

export function useGroupTransactionsBalance({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.balance(groupId),
    queryFn: async () => getGroupTransactionsBalance({ groupId }),
  });
}
