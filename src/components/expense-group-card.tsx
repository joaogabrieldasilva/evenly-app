import { Image, Text, View, ViewProps } from "react-native";
import { formatCurrency } from "../utils/format-currency";
import { cn } from "../utils/cn";
import { Button } from "./ui/button";
import { router } from "expo-router";

type ExpenseGroup = {
  id: number;
  name: string;
  description: string;
  totalExpenses: number;
  members: string[];
};

type ExpenseGroupCardProps = {} & ExpenseGroup & Omit<ViewProps, "id">;

export function ExpenseGroupCard({
  id,
  name,
  description,
  members,
  totalExpenses,
  className,
  ...props
}: ExpenseGroupCardProps) {
  return (
    <View
      className={cn(
        "rounded-xl border border-gray-300 p-4 shadow-sm  shadow-slate-100 bg-white",
        className
      )}
      {...props}
    >
      <View className="flex-row justify-between ">
        <View>
          <Text className="font-semibold text-lg">{name}</Text>
          <Text className="text-sm text-gray-500">{description}</Text>
        </View>
        <View>
          <Text className="font-semibold text-md self-end">
            {formatCurrency(totalExpenses)}
          </Text>
          <Text className="text-xs text-gray-500">Total Expenses</Text>
        </View>
      </View>

      <View className="flex-row items-center mt-4">
        {members.slice(0, 4)?.map((member, index) => (
          <View
            key={index}
            className="bg-gray-100 rounded-full border-2 border-white"
            style={{
              transform: [
                {
                  translateX: -(index * 10),
                },
              ],
            }}
          >
            <Image
              className="size-10"
              borderRadius={100}
              source={{
                uri: member,
              }}
            />
          </View>
        ))}
      </View>
      <Button
        text="View details"
        className="py-3 self-end"
        onPress={() =>
          router.navigate({
            pathname: "/group/[groupId]",
            params: { groupId: id },
          })
        }
      />
    </View>
  );
}
