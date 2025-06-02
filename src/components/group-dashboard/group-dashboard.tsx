import { GenericCard } from "@/src/components/generic-card";
import { useGroupCategoryCount } from "@/src/queries/groups/use-group-category-count";
import { useGroupMembersCount } from "@/src/queries/groups/use-group-members-count";
import { useGroupTotalSpent } from "@/src/queries/groups/use-group-total-spent";
import { formatCurrency } from "@/src/utils/format-currency";
import { ChartColumn, DollarSign, UserCircle } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type GroupDashboardProps = {
  groupId: number;
};

export function GroupDashboard({ groupId }: GroupDashboardProps) {
  const { data: totalSpentData } = useGroupTotalSpent({ groupId });

  const { data: categoryCountData } = useGroupCategoryCount({ groupId });

  const { data: membersCount } = useGroupMembersCount({ groupId });

  return (
    <Animated.FlatList
      className="mt-4"
      contentContainerClassName="px-4 gap-y-4"
      data={[
        {
          label: "Total Spent",
          value: formatCurrency(totalSpentData?.total || 0),
          description: "Overall spending for this group",
          icon: <DollarSign size={18} color="#64748b" />,
        },
        {
          label: "Categories",
          value: String(categoryCountData?.categoryCount || 0),
          description: "Unique spending categories",
          icon: <ChartColumn size={18} color="#64748b" />,
        },
        {
          label: "Active members",
          value: String(membersCount?.membersCount || 0),
          description: "Members participating in this group",
          icon: <UserCircle size={18} color="#64748b" />,
        },
      ]}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInDown.delay(index * 100)}>
          <GenericCard {...item} />
        </Animated.View>
      )}
      keyExtractor={(item) => item.label}
    />
  );
}
