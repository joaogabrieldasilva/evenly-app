import {
  Calendar,
  Edit,
  Trash,
  Trash2,
  User,
  Users,
} from "lucide-react-native";
import { Image, Pressable, Text, View, ViewProps } from "react-native";
import { formatDate } from "../utils/format-date";
import { ProfilePicture } from "./ui/profile-picture";
import { formatCurrency } from "../utils/format-currency";
import { Button } from "./ui/button";

type ExpenseCardProps = {
  id: number;
  description: string;
  amount: number;
  paidBy: {
    name: string;
    profilePictureUrl: string;
  };
  splittedWith: {
    name: string;
    profilePictureUrl: string;
  }[];
  createdAt: Date;
  category: string;
  onEdit?: (id: number) => void;
} & Omit<ViewProps, "id">;

export function ExpenseCard({
  id,
  description,
  amount,
  paidBy,
  splittedWith,
  createdAt,
  category,
  onEdit,
}: ExpenseCardProps) {
  return (
    <View className="rounded-xl border border-gray-300 p-4 shadow-sm  shadow-slate-100 bg-white">
      <View className="flex-row items-center justify-between mb-2">
        <Text
          className="text-lg font-medium"
          style={{
            color: !description ? "#9ca3af" : "black",
          }}
        >
          {description || "(No description)"}
        </Text>

        <View className="flex-row items-center gap-x-3">
          <Text className="font-bold text-[20px]">
            {formatCurrency(amount)}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-x-2">
        <Calendar size={14} color="#6b7280" />
        <Text className="text-gray-500">{formatDate(createdAt)}</Text>
        <View className="px-3 py-1 bg-sky-100 rounded-full">
          <Text className="text-sky-500 font-medium">
            {category || "Uncategorized"}
          </Text>
        </View>
      </View>
      <View className="mt-4">
        <View className="flex-row items-center gap-x-2">
          <User size={16} color="#6b7280" />
          <Text className="text-gray-500">Paid by</Text>
        </View>
        <View className="flex-row items-center gap-x-2 mt-2">
          <View className="bg-gray-100 rounded-full border-2 border-white">
            <ProfilePicture
              userName={paidBy.name}
              uri={paidBy.profilePictureUrl}
              size="sm"
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
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center mt-2 gap-2 flex-wrap flex-1">
            {splittedWith.map((member, index) => (
              <View key={index} className="flex-row items-center gap-x-1">
                <ProfilePicture
                  userName={member.name}
                  uri={member.profilePictureUrl}
                  size="sm"
                />
                <Text className="text-gray-500">{member.name}</Text>
              </View>
            ))}
          </View>
          <Button
            hitSlop={20}
            leftIcon={<Edit size={18} />}
            variant="outline"
            className="self-end p-2"
            onPress={() => {
              if (onEdit) onEdit(id);
            }}
            disabled={!onEdit}
          />
        </View>
      </View>
    </View>
  );
}
