import { DollarSign, UserMinus } from "lucide-react-native";
import { ReactElement } from "react";
import { Image, Pressable, Text, View, ViewProps } from "react-native";
import { formatCurrency } from "../utils/format-currency";
import { ProfilePicture } from "./ui/profile-picture";

type UserCardProps = {
  id: number;
  name: string;
  profileImage: string;
  balance: number;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
} & Omit<ViewProps, "id">;

export function UserCard({
  id,
  name,
  profileImage,
  balance,
  onDelete,
  showDelete,
}: UserCardProps) {
  return (
    <View className="rounded-xl border border-gray-300 px-4 py-2 shadow-sm  shadow-slate-100 bg-white">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-2">
          <ProfilePicture uri={profileImage} userName={name} size="lg" />

          <Text className="text-black font-semibold text-xl">{name}</Text>
        </View>
        {showDelete ? (
          <Pressable
            disabled={!onDelete}
            onPress={() => onDelete && onDelete(id)}
          >
            <UserMinus size={18} color="#6b7280" />
          </Pressable>
        ) : null}
      </View>
      <View className="flex-row items-center gap-x-2 mt-4 ml-2">
        <DollarSign size={18} color="#0ea5e9" />
        <Text className="text-gray-500">Balance: </Text>
        <Text
          className="font-bold"
          style={{
            color: balance < 0 ? "#dc2626" : "#16a34a",
          }}
        >
          {formatCurrency(balance)}
        </Text>
      </View>
    </View>
  );
}
