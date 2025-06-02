import {
  ApiUserGroups,
  getUserGroups,
} from "@/src/http/groups/get-user-groups";
import { useInfiniteQuery } from "@tanstack/react-query";
import { groupKeys } from "./group-query-keys";

export function usePaginatedGroups() {
  const { data, ...rest } = useInfiniteQuery({
    initialPageParam: null,
    getNextPageParam: (lastPage: ApiUserGroups) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60, // 1 hour,
    queryKey: groupKeys.all,
    queryFn: async ({ pageParam: cursor }) => {
      const response = await getUserGroups({ cursor });

      return {
        nextCursor: response.nextCursor,
        groups: response.groups,
      };
    },
  });

  const groups = data?.pages.flatMap((item) => item.groups) || [];

  return {
    data: groups,
    ...rest,
  };
}
