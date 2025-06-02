import { DollarSign, UserMinus } from "lucide-react-native";
import { ReactElement } from "react";
import { Image, Pressable, Text, View, ViewProps } from "react-native";
import { formatCurrency } from "../utils/format-currency";

type UserCardProps = {
  id: number;
  name: string;
  profileImage: string;
  balance: number;
  onDelete?: (id: number) => void;
} & Omit<ViewProps, "id">;

export function UserCard({
  id,
  name,
  profileImage,
  balance,
  onDelete,
}: UserCardProps) {
  return (
    <View className="rounded-xl border border-gray-300 px-4 py-2 shadow-sm  shadow-slate-100 bg-white">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-2">
          <View className="bg-gray-100 rounded-full border-2 border-white">
            <Image
              className="size-12"
              borderRadius={100}
              source={{
                uri: profileImage,
              }}
            />
          </View>
          <Text className="text-black font-semibold text-xl">{name}</Text>
        </View>
        <Pressable
          disabled={!onDelete}
          onPress={() => onDelete && onDelete(id)}
        >
          <UserMinus size={18} color="#6b7280" />
        </Pressable>
      </View>
      <View className="flex-row items-center gap-x-2 mt-4 ml-2">
        <DollarSign size={18} color="#0ea5e9" />
        <Text className="text-gray-500">Balance: </Text>
        <Text
          className="font-medium"
          style={{
            color: balance < 0 ? "#EF4444" : "#16a34a",
          }}
        >
          {formatCurrency(balance)}
        </Text>
      </View>
    </View>
  );
}
