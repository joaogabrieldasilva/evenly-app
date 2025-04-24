import { cn } from "@/src/utils/cn";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

type TextInputProps = {
  name: string;
} & RNTextInputProps;

export function TextInput({ name, className, ...props }: TextInputProps) {
  const { control } = useFormContext();

  return (
    <View
      className={cn(
        "flex-row items-center justify-center p-4 rounded-md border border-gray-400",
        className
      )}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field } }) => {
          return (
            <RNTextInput
              {...props}
              className="w-full"
              onChangeText={onChange}
              {...field}
            />
          );
        }}
      />
    </View>
  );
}
