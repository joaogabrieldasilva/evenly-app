import { formatCurrency } from "@/src/utils/format-currency";
import { TextInput, TextInputProps } from "./text-input";
import { useController, useFormContext } from "react-hook-form";

type CurrencyTextInputProps = TextInputProps;

export function CurrencyTextInput({ name, ...props }: CurrencyTextInputProps) {
  const { control } = useFormContext();
  const {
    field: { value },
  } = useController({ control, name });

  return (
    <TextInput
      name={name}
      keyboardType="number-pad"
      defaultValue={formatCurrency(value || 0)}
      formatter={(text) => {
        const cleanText = Number(text?.replace(/\D/g, "")) / 100;

        return formatCurrency(cleanText);
      }}
      {...props}
    />
  );
}
