import { useGroupDetails } from "@/src/queries/groups/use-group-details";
import { useGroupTransactions } from "@/src/queries/groups/use-group-transactions";
import { useGroupTransactionsBalance } from "@/src/queries/groups/use-group-transactions-balance";
import { formatCurrency } from "@/src/utils/format-currency";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

export default function TripGroup() {
  const params = useLocalSearchParams<{ groupId: string }>();
  const navigation = useNavigation();
  const groupId = Number(params?.groupId);

  const { data: groupDetails } = useGroupDetails({ groupId });

  const { data: balance } = useGroupTransactionsBalance({ groupId });

  const { data: groupTransactions } = useGroupTransactions({ groupId });

  useEffect(() => {
    navigation.setOptions({
      title: groupDetails?.name,
    });
  }, [navigation, groupDetails?.name]);

  return (
    <View className="flex-1">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-4"
      >
        <View className="flex-row items-center gap-x-2">
          <Text className="font-bold text-lg">Despesas Totais:</Text>
          {groupDetails?.totalExpenses ? (
            <Text className="text-lg">
              {formatCurrency(groupDetails?.totalExpenses)}
            </Text>
          ) : null}
        </View>
        <FlatList
          data={balance || []}
          scrollEnabled={false}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName="gap-y-4"
          renderItem={({ item }) => (
            <View
              key={item.id}
              className="bg-white drop-shadow-lg w-full pt-2 p-4 gap-y-2 rounded-md"
            >
              <View className="flex-row items-center gap-x-2">
                <Image
                  className="size-10"
                  borderRadius={100}
                  source={{
                    uri: item.profileImage,
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
          )}
        />
        <FlatList
          data={groupTransactions}
          scrollEnabled={false}
          keyExtractor={(item) => String(item.transactionId)}
          ListHeaderComponent={
            <Text className="text-2xl font-bold mt-4">Transactions</Text>
          }
          contentContainerClassName="gap-y-4"
          renderItem={({ item }) => (
            <View
              key={item.transactionId}
              className="bg-white drop-shadow-lg w-full pt-2 p-4 rounded-md"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-x-2">
                  <Image
                    className="size-10"
                    borderRadius={100}
                    source={{
                      uri: item.authorProfileImage,
                    }}
                  />
                  <Text className="text-lg font-bold">{item.author}</Text>
                </View>
                <Text className="font-bold text-xl">
                  {formatCurrency(item.amount)}
                </Text>
              </View>

              <View>
                <Text className="text-gray-600 font-medium mt-4">
                  Participants
                </Text>
                <View className="flex-row items-center mt-4">
                  {item.borrowers?.map((member, index) => (
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
                        className="size-8"
                        borderRadius={100}
                        source={{
                          uri: member,
                        }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
