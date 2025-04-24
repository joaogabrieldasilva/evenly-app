import { ExpenseGroupCard } from "@/src/components/expense-group-card";
import { usePaginatedGroups } from "@/src/queries/groups/use-paginated-groups";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function TabOneScreen() {
  const {
    data: groups,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedGroups();

  return (
    <View className="flex-1 ">
      <FlatList
        data={groups}
        contentContainerClassName="p-4 gap-y-4"
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
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
                pathname: "/group/[groupId]",
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
