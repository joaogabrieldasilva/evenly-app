import { Image, Text, View } from "react-native";
import { formatCurrency } from "../utils/format-currency";

type ExpenseGroup = {
  id: number;
  name: string;
  description: string;
  totalExpenses: number;
  members: string[];
};

type ExpenseGroupCardProps = {} & ExpenseGroup;

export function ExpenseGroupCard({
  name,
  description,
  members,
  totalExpenses,
}: ExpenseGroupCardProps) {
  return (
    <View className="bg-white rounded-md p-4">
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
        {members?.map((member, index) => (
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
              className="size-12"
              borderRadius={100}
              source={{
                uri: member,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
