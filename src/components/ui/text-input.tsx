import { cn } from "@/src/utils/cn";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

export type TextInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  inputContainerClassname?: string;
  required?: boolean;
  formatter?: (value: string) => void;
  renderInputComponent?: (
    props: (RNTextInputProps | BottomSheetTextInputProps) & {
      disabled?: boolean;
    }
  ) => ReactElement;
} & Omit<RNTextInputProps, "enabled" | "value">;

export function TextInput({
  name,
  className,
  inputContainerClassname,
  disabled,
  label,
  formatter,
  defaultValue,
  required = true,
  multiline,
  renderInputComponent = (props) => <RNTextInput {...props} />,
  ...props
}: TextInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => {
        return (
          <View className={className}>
            <View className="flex-row items-center gap-x-1 mb-2">
              <Text className="text-md font-bold text-gray-700">{label}</Text>
              {!required ? (
                <Text className="text-md font-normal text-slate-500">
                  (opcional)
                </Text>
              ) : null}
            </View>
            <View
              className={cn(
                "flex-row items-center rounded-2xl border border-gray-300 bg-white",
                disabled && "opacity-40",
                multiline && "h-24 items-start",
                inputContainerClassname
              )}
            >
              <View className="flex-1">
                {renderInputComponent({
                  disabled,
                  multiline,
                  ...props,
                  defaultValue: defaultValue,
                  className:
                    "flex-1 p-4 rounded-2xl text-md text-gray-600 text-[#6b7280]",
                  placeholderTextColor: "#6b7280",
                  onChangeText: (text) => {
                    const formattedText = formatter ? formatter(text) : text;
                    onChange(formattedText);
                  },
                  ...field,
                })}
              </View>
            </View>
            {error ? (
              <Text className="text-red-500 font-medium mt-2 ml-2">
                {error.message}
              </Text>
            ) : null}
          </View>
        );
      }}
    />
  );
}
