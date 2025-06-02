import { formatCurrency } from "@/src/utils/format-currency";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ExpenseCard } from "../expense-card";

type GroupExpensesProps = {
  groupId: number;
};

export function GroupExpenses({ groupId }: GroupExpensesProps) {
  return (
    <Animated.FlatList
      className="mt-4"
      contentContainerClassName="px-4 gap-y-4"
      data={[
        {
          id: 1,
          value: formatCurrency(42),
          description: "Dinner",
          createdAt: new Date(),
          paidBy: {
            name: "João",
            profilePictureUrl: "",
          },
          splitWith: [
            { name: "Bruno", profilePictureUrl: "" },
            { name: "Natalia", profilePictureUrl: "" },
          ],
          category: "Food",
        },
        {
          id: 2,
          value: formatCurrency(42),
          description: "Dinner",
          createdAt: new Date(),
          paidBy: {
            name: "João",
            profilePictureUrl: "",
          },
          splitWith: [
            { name: "Bruno", profilePictureUrl: "" },
            { name: "Natalia", profilePictureUrl: "" },
          ],
          category: "Food",
        },
      ]}
      renderItem={({ item, index }) => (
        <Animated.View entering={FadeInDown.delay(index * 100)}>
          <ExpenseCard {...item} />
        </Animated.View>
      )}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
