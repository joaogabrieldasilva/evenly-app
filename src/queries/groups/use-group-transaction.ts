import { getGroupTransactions } from "@/src/http/transactions/get-group-transactions";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";
import { getGroupTransaction } from "@/src/http/transactions/get-group-transaction";

type Params = {
  groupId: number;
  transactionId: number;
};

export function useGroupTransaction({ groupId, transactionId }: Params) {
  return useQuery({
    enabled: !!transactionId,
    queryKey: groupKeys.transaction(groupId, transactionId),
    queryFn: async () => await getGroupTransaction({ groupId, transactionId }),
  });
}
