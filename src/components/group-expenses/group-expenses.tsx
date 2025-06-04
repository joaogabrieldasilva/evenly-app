import { useGroupTransactions } from "@/src/queries/groups/use-group-transactions";
import { LegendList } from "@legendapp/list";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { ExpenseCard } from "../expense-card";
import { router } from "expo-router";
import { NoContentPanel } from "../no-content-panel";
import { PlusIcon, Receipt } from "lucide-react-native";
import { Button } from "../ui/button";

type GroupExpensesProps = {
  groupId: number;
};

export function GroupExpenses({ groupId }: GroupExpensesProps) {
  const { data: groupTransactions = [] } = useGroupTransactions({ groupId });

  return (
    <LegendList
      style={{
        marginTop: 16,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 148,
        rowGap: 16,
      }}
      showsVerticalScrollIndicator={false}
      data={groupTransactions}
      ListEmptyComponent={
        <NoContentPanel
          className="mt-10"
          icon={Receipt}
          title="No expenses yet"
          description="Add your first expense to start tracking shared costs in this group."
          footer={
            <Button
              className="mt-6"
              text="Add your first expense"
              leftIcon={<PlusIcon size={18} color="white" />}
            />
          }
        />
      }
      recycleItems
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown.delay(index * 100)}
          layout={LinearTransition}
        >
          <ExpenseCard
            {...item}
            onEdit={() => {
              router.navigate({
                pathname: "/(private)/create-expense",
                params: {
                  groupId,
                  transactionId: item.id,
                },
              });
            }}
          />
        </Animated.View>
      )}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
