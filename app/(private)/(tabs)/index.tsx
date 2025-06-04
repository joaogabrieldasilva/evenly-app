import { CreateGroupBottomSheet } from "@/src/components/create-group-bottom-sheet";
import { ExpenseGroupCard } from "@/src/components/expense-group-card";
import { NoContentPanel } from "@/src/components/no-content-panel";
import { Button } from "@/src/components/ui/button";
import { useBottomSheetModalRef } from "@/src/hooks/use-bottom-sheet-modal-ref";
import { useListRefresh } from "@/src/hooks/use-list-refresh";
import { usePaginatedGroups } from "@/src/queries/groups/use-paginated-groups";
import { PlusIcon, Users } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Groups() {
  const {
    data: groups,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    error,
  } = usePaginatedGroups();

  const [isRefreshing, refresh] = useListRefresh({
    refresh: refetch,
  });

  const bottomSheetRef = useBottomSheetModalRef();

  // const { clear } = useAuthActions();
  // useEffect(() => {
  //   clear();
  // }, []);

  return (
    <View className="flex-1 bg-white">
      <CreateGroupBottomSheet ref={bottomSheetRef} />
      <Animated.FlatList
        data={groups}
        contentContainerClassName="p-4 gap-y-4"
        onEndReached={() =>
          hasNextPage && !isFetchingNextPage && fetchNextPage()
        }
        refreshing={isRefreshing}
        onRefresh={refresh}
        ListEmptyComponent={
          <NoContentPanel
            icon={Users}
            title="No expense groups yet"
            description="Create your first expense group to start tracking shared expenses with friends, family or roommates"
          />
        }
        ListHeaderComponent={
          <View className="p-2">
            <Button
              onPress={() => bottomSheetRef.current?.present()}
              text="Create group"
              leftIcon={<PlusIcon size={16} color="white" />}
            />
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <Text className="text-center">Loading...</Text>
          ) : null
        }
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 100)}>
            <ExpenseGroupCard
              {...item}
              className="pb-4 border-b border-b-gray-200"
            />
          </Animated.View>
        )}
      />
    </View>
  );
}
