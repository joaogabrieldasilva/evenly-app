import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

type TextInputProps = {
  name: string;
} & RNTextInputProps;

export function TextInput({ name, ...props }: TextInputProps) {
  const { control } = useFormContext();

  return (
    <View className="flex-row items-center justify-center p-4 rounded-md border">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field } }) => {
          return (
            <RNTextInput
              className="w-full"
              {...props}
              onChangeText={onChange}
              {...field}
            />
          );
        }}
      />
    </View>
  );
}
