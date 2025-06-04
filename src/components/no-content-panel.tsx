import { Text, View, ViewProps } from "react-native";
import { cn } from "../utils/cn";
import { ReactElement } from "react";
import { LucideIcon, Users } from "lucide-react-native";

type NoContentPanelProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  footer?: ReactElement | ReactElement[];
} & Omit<ViewProps, "children">;

export function NoContentPanel({
  title,
  description,
  className,
  footer,
  icon: Icon,
  ...props
}: NoContentPanelProps) {
  return (
    <View className={cn("items-center", className)} {...props}>
      {Icon && (
        <View className="size-20 rounded-full bg-sky-100 items-center justify-center mb-4">
          {<Icon size={32} color="#0ea5e9" />}
        </View>
      )}
      <Text className="font-bold text-2xl mb-2">{title}</Text>
      <Text className="text-slate-500 text-center text-lg max-w-[65%]">
        {description}
      </Text>
      {footer}
    </View>
  );
}
