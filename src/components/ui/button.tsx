import { cn } from "@/src/utils/cn";
import { ReactElement } from "react";
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

const variants = {
  solid: {
    background: "bg-sky-500 p-4 rounded-xl",
    text: "text-white text-center font-bold text-lg",
  },
  outline: {
    background: "p-4 rounded-xl border border-slate-300 bg-white",
    text: "text-center font-bold text-lg",
  },
};

type ButtonProps = {
  variant?: keyof typeof variants;
  text: string;
  textProps?: TextProps;
  leftIcon?: ReactElement;
} & TouchableOpacityProps;

export function Button({
  variant = "solid",
  text,
  textProps,
  className,
  leftIcon,
  ...props
}: ButtonProps) {
  const variantStyles = variants[variant];

  return (
    <TouchableOpacity
      className={cn(
        "flex-row items-center justify-center",
        variantStyles.background,
        className
      )}
      {...props}
    >
      {leftIcon}
      <Text
        {...textProps}
        className={cn("mx-2", variantStyles.text, textProps?.className)}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
