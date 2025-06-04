import { UserCard } from "../user-card";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useGroupUsersBalance } from "@/src/queries/groups/use-group-users-balance";
import { useAuth } from "@/src/store/auth-store";

type GroupMembersProps = {
  groupId: number;
  groupOwnerId: number;
};

export function GroupMembers({ groupId, groupOwnerId }: GroupMembersProps) {
  const { userId } = useAuth();
  const isOwner = userId === groupOwnerId;
  const { data: membersBalance = [] } = useGroupUsersBalance({ groupId });

  return (
    <Animated.FlatList
      className="mt-4"
      contentContainerClassName="px-4 gap-y-4"
      data={membersBalance}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInDown.delay(index * 100)}>
          <UserCard
            {...item}
            showDelete={false && isOwner && item.id !== userId}
            onDelete={() => {
              console.log("DELETE", item.name);
            }}
          />
        </Animated.View>
      )}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
