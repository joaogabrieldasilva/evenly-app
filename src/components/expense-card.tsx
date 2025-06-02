import { Calendar, Trash, Trash2, User, Users } from "lucide-react-native";
import { Image, Pressable, Text, View, ViewProps } from "react-native";
import { formatDate } from "../utils/format-date";

type ExpenseCardProps = {
  id: number;
  description: string;
  value: string;
  paidBy: {
    name: string;
    profilePictureUrl: string;
  };
  splitWith: {
    name: string;
    profilePictureUrl: string;
  }[];
  createdAt: Date;
  category: string;
  onDelete?: (id: number) => void;
} & Omit<ViewProps, "id">;

export function ExpenseCard({
  id,
  description,
  value,
  paidBy,
  splitWith,
  createdAt,
  category,
  onDelete,
}: ExpenseCardProps) {
  return (
    <View className="rounded-xl border border-gray-300 p-4 shadow-sm  shadow-slate-100 bg-white">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-black text-lg font-medium">{description}</Text>

        <View className="flex-row items-center gap-x-3">
          <Text className="font-bold text-[20px]">{value}</Text>
          <Pressable
            hitSlop={20}
            onPress={() => {
              if (onDelete) onDelete(id);
            }}
            disabled={!onDelete}
          >
            <Trash2 size={18} />
          </Pressable>
        </View>
      </View>
      <View className="flex-row items-center gap-x-2">
        <Calendar size={14} color="#6b7280" />
        <Text className="text-gray-500">{formatDate(createdAt)}</Text>
        <View className="px-3 py-1 bg-sky-100 rounded-full">
          <Text className="text-sky-500 font-medium">{category}</Text>
        </View>
      </View>
      <View className="mt-4">
        <View className="flex-row items-center gap-x-2">
          <User size={16} color="#6b7280" />
          <Text className="text-gray-500">Paid by</Text>
        </View>
        <View className="flex-row items-center gap-x-2 mt-2">
          <View className="bg-gray-100 rounded-full border-2 border-white">
            <Image
              className="size-8"
              borderRadius={100}
              source={{
                uri: paidBy.profilePictureUrl,
              }}
            />
          </View>

          <Text className="text-gray-500">{paidBy.name}</Text>
        </View>
      </View>
      <View className="mt-4">
        <View className="flex-row items-center gap-x-2">
          <Users size={16} color="#6b7280" />
          <Text className="text-gray-500">Split with</Text>
        </View>
        <View className="flex-row items-center mt-2 gap-x-2">
          {splitWith.map((member, index) => (
            <View key={index} className="flex-row items-center gap-x-1">
              <View
                key={index}
                className="bg-gray-100 rounded-full border-2 border-white"
              >
                <Image
                  className="size-8"
                  borderRadius={100}
                  source={{
                    uri: member.profilePictureUrl,
                  }}
                />
              </View>
              <Text className="text-gray-500">{member.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
