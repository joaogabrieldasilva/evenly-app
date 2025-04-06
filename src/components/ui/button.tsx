import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const variants = {
  solid: {
    background: "bg-green-500 p-4 rounded-xl w-full",
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
  ...props
}: ButtonProps) {
  const variantStyles = variants[variant];

  return (
    <TouchableOpacity className={variantStyles.background} {...props}>
      <Text {...textProps} className={variantStyles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
