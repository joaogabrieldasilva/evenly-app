import { cn } from "@/src/utils/cn";
import { CheckCheck } from "lucide-react-native";
import { ReactNode } from "react";
import { Text, View, ViewProps, StyleProp, TextStyle } from "react-native";

const variants = {
  solid: {
    background: "bg-sky-500 border border-sky-500",
    text: "text-white font-medium",
  },
  outline: {
    background: "bg-white shadow-slate-500 border border-gray-200",
    text: "text-gray-500",
  },
};

type ChipProps = {
  label: string;
  variant?: keyof typeof variants;
  textClassName?: string;
  disabled?: boolean;
  icon?: ReactNode | ReactNode[];
  textStyle?: StyleProp<TextStyle>;
} & ViewProps;

export function Chip({
  label,
  className,
  textClassName,
  variant = "solid",
  disabled,
  textStyle,
  icon,
  ...props
}: ChipProps) {
  const variantStyles = variants[variant];

  return (
    <View
      className={cn(
        "px-4 py-2 items-center justify-center rounded-3xl self-start flex-row gap-x-2",
        variantStyles.background,
        disabled && "opacity-40",
        className
      )}
      {...props}
    >
      {icon}
      {label ? (
        <Text
          style={textStyle}
          className={cn(
            "text-center font-normal text-md",
            variantStyles.text,
            textClassName
          )}
        >
          {label}
        </Text>
      ) : null}
    </View>
  );
}
