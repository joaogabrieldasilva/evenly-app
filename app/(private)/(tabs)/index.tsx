import { ExpenseGroupCard } from "@/src/components/expense-group-card";
import { api } from "@/src/http/api";
import { useAuth } from "@/src/store/auth-store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type GroupListPage = {
  nextCursor: null | number;
  groups: {
    id: number;
    name: string;
    description: string;
    totalExpenses: number;
    members: [];
  }[];
};

export default function TabOneScreen() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    initialPageParam: null,
    getNextPageParam: (lastPage: GroupListPage) => lastPage.nextCursor,
    queryKey: ["groups"],
    queryFn: async ({ pageParam: cursor }) => {
      const response = await api.get<GroupListPage>("/groups", {
        params: {
          cursor,
          pageSize: 15,
        },
      });

      const data = response.data;

      return {
        nextCursor: data.nextCursor,
        groups: data.groups,
      };
    },
  });

  const groups = data?.pages.flatMap((item) => item.groups) || [];

  return (
    <View className="flex-1 ">
      <FlatList
        data={groups}
        contentContainerClassName="p-4 gap-y-4"
        onEndReached={() => !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text className="text-center">Loading...</Text>
          ) : null
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/group",
                params: { groupId: item.id },
              })
            }
          >
            <ExpenseGroupCard {...item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
