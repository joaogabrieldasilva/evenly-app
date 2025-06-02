import { getGroupExpenseReport } from "@/src/http/transactions/get-group-expense-report";
import { useQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";
import { getGroupCategoryReport } from "@/src/http/transactions/get-group-category-report";

type Params = {
  groupId: number;
};

export function useGroupCategoryReport({ groupId }: Params) {
  return useQuery({
    queryKey: groupKeys.categoryReport(groupId),
    queryFn: async () => getGroupCategoryReport({ groupId }),
  });
}
