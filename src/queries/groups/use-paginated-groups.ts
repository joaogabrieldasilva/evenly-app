import {
  ApiUserGroups,
  getUserGroups,
} from "@/src/http/groups/get-user-groups";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePaginatedGroups() {
  const { data, ...rest } = useInfiniteQuery({
    initialPageParam: null,
    getNextPageParam: (lastPage: ApiUserGroups) => lastPage.nextCursor,
    queryKey: ["groups"],

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
