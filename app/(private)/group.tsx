import { api } from "@/src/http/api";
import { useGroupDetails } from "@/src/queries/groups/use-group-details";
import { useGroupTransactions } from "@/src/queries/groups/use-group-transactions";
import { useGroupTransactionsBalance } from "@/src/queries/groups/use-group-transactions-balance";
import { formatCurrency } from "@/src/utils/format-currency";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  router,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function TripGroup() {
  const params = useLocalSearchParams<{ groupId: string }>();
  const navigation = useNavigation();
  const groupId = Number(params?.groupId);

  const { data = {} } = useGroupDetails({ groupId });

  const { data: balance = [] } = useGroupTransactionsBalance({ groupId });

  const { data: groupTransactions = [] } = useGroupTransactions({ groupId });

  useEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [navigation, data?.name]);

  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center gap-x-2">
        <Text className="font-bold text-lg">Despesas Totais:</Text>
        <Text className="text-lg">{formatCurrency(data?.totalExpenses)}</Text>
      </View>
      <View className="flex-row flex-wrap gap-x-8 mt-4 gap-y-4">
        {balance.map((item) => (
          <View
            key={item.id}
            className="bg-white drop-shadow-lg w-full pt-2 p-4 gap-y-2 rounded-md"
          >
            <View className="flex-row items-center gap-x-2">
              <Image
                className="size-10"
                borderRadius={100}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbkECXtEG_6-RV7CSNgNoYUGZE-JCliYm9g&s",
                }}
              />
              <Text className="text-lg font-bold">{item.name}</Text>
            </View>
            <View className="flex-row items-center gap-x-4 mt-2">
              <View className="bg-green-100 self-start px-1 py-0.5 rounded-lg border-green-600 border-[0.5px]">
                <Text className="text-green-600">
                  Gets {formatCurrency(item.hasToReceive)}
                </Text>
              </View>
              <View className="bg-orange-100 self-start px-1.5 py-0.5 rounded-lg border-orange-600 border-[0.5px]">
                <Text className="text-orange-600">
                  Owes {formatCurrency(item.hasToPay)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
