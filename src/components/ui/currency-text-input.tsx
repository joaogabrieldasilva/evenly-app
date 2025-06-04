import { formatCurrency } from "@/src/utils/format-currency";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/src/utils/cn";
import { useEffect, useRef, useState } from "react";

type CurrencyTextInputProps = {
  name: string;
} & TextInputProps;

export function CurrencyTextInput({
  name,
  className,
  ...props
}: CurrencyTextInputProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name });

  const [selection, setSelection] = useState({
    start: value?.length || 0,
    end: value?.length || 0,
  });

  return (
    <View className={cn("items-center", className)}>
      <TextInput
        value={value}
        className="text-[3rem] font-bold text-gray-800 border-b border-b-gray-300 pb-2"
        keyboardType="number-pad"
        onChangeText={(text) => {
          const cleanText = Number(text?.replace(/\D/g, "")) / 100;

          const formattedText = formatCurrency(cleanText);
          onChange(formattedText);

          setTimeout(
            () =>
              setSelection({
                start: formattedText.length,
                end: formattedText.length,
              }),
            0
          );
        }}
        onSelectionChange={(e) => {
          setSelection({
            start: e.nativeEvent.selection.start,
            end: e.nativeEvent.selection.end,
          });
        }}
        selection={selection}
        {...props}
      />
      {error ? (
        <Text className="text-red-500 font-medium mt-2 ml-2">
          {error.message}
        </Text>
      ) : null}
    </View>
  );
}
