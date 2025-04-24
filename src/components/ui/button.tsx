import { cn } from "@/src/utils/cn";
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const variants = {
  solid: {
    background: "bg-green-600 p-4 rounded-xl w-full",
    text: "text-white text-center font-bold text-lg",
  },
  outline: {
    background: "",
    text: "",
  },
};

type ButtonProps = {
  variant?: keyof typeof variants;
  text: string;
  textProps?: TextProps;
} & TouchableOpacityProps;

export function Button({
  variant = "solid",
  text,
  textProps,
  className,
  ...props
}: ButtonProps) {
  const variantStyles = variants[variant];

  return (
    <TouchableOpacity
      className={cn(variantStyles.background, className)}
      {...props}
    >
      <Text
        {...textProps}
        className={cn(variantStyles.text, textProps?.className)}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
