import { DollarSign } from "lucide-react-native";
import { ReactElement } from "react";
import { Text, View, ViewProps } from "react-native";

type GenericCardProps = {
  label: string;
  value: string;
  icon?: ReactElement;
  description: string;
} & ViewProps;

export function GenericCard({
  label,
  value,
  description,
  icon,
}: GenericCardProps) {
  return (
    <View className="rounded-xl border border-gray-300 p-4 shadow-sm  shadow-slate-100 bg-white">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-black text-lg font-medium">{label}</Text>
        {icon}
      </View>
      <Text className="font-bold text-2xl">{value}</Text>
      <Text className="text-gray-500">{description}</Text>
    </View>
  );
}
