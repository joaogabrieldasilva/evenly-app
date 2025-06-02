import { GroupDashboard } from "@/src/components/group-dashboard/group-dashboard";
import { GroupExpenses } from "@/src/components/group-expenses/group-expenses";
import { GroupMembers } from "@/src/components/group-members/group-members";
import { Button } from "@/src/components/ui/button";
import { SegmentedPicker } from "@/src/components/ui/segmented-picker";
import { useGroupDetails } from "@/src/queries/groups/use-group-details";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  ChartColumn,
  PlusIcon,
  Receipt,
  UserRoundPlus,
  Users,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

const tabComponents = {
  dashboard: GroupDashboard,
  expenses: GroupExpenses,
  members: GroupMembers,
};

export default function TripGroup() {
  const params = useLocalSearchParams<{ groupId: string }>();
  const navigation = useNavigation();
  const groupId = Number(params?.groupId);

  const [selectedTab, setSelectedTab] =
    useState<keyof typeof tabComponents>("dashboard");

  const { data: groupDetails } = useGroupDetails({ groupId });

  const TabContentComponent = useMemo(() => {
    return tabComponents[selectedTab];
  }, [selectedTab, groupId]);

  useEffect(() => {
    navigation.setOptions({
      title: groupDetails?.name,
    });
  }, [navigation, groupDetails?.name]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row gap-x-4 m-4">
        <Button
          text="Add member"
          variant="outline"
          className="px-4 py-3"
          leftIcon={<UserRoundPlus size={18} />}
        />
        <Button
          text="Add Expense"
          className="px-4 py-3"
          leftIcon={<PlusIcon color="white" size={18} />}
        />
      </View>
      <SegmentedPicker
        selectedValue={selectedTab}
        setSelectedValue={setSelectedTab}
        className="mx-4"
        options={[
          {
            label: "Dashboard",
            value: "dashboard",
            renderIcon: ({ color }) => <ChartColumn size={14} color={color} />,
          },
          {
            label: "Expenses",
            value: "expenses",
            renderIcon: ({ color }) => <Receipt size={14} color={color} />,
          },
          {
            label: "Members",
            value: "members",
            renderIcon: ({ color }) => <Users size={14} color={color} />,
          },
        ]}
      />
      <TabContentComponent groupId={groupId} />
    </View>
  );
}
