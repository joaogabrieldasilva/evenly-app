import { UserCard } from "../user-card";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useGroupUsersBalance } from "@/src/queries/groups/use-group-users-balance";

type GroupMembersProps = {
  groupId: number;
};

export function GroupMembers({ groupId }: GroupMembersProps) {
  const { data: membersBalance = [] } = useGroupUsersBalance({ groupId });

  return (
    <Animated.FlatList
      className="mt-4"
      contentContainerClassName="px-4 gap-y-4"
      data={membersBalance}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInDown.delay(index * 100)}>
          <UserCard {...item} />
        </Animated.View>
      )}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
