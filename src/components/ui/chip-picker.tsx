import { cn } from "@/src/utils/cn";
import { Pressable, ScrollView, Text, View, ViewProps } from "react-native";
import { Chip } from "./chip";
import { Controller, useController, useFormContext } from "react-hook-form";
import { ReactElement, ReactNode, useEffect, useMemo } from "react";
import { Square, SquareCheck } from "lucide-react-native";

type ChipProps<T extends string | number> = {
  name: string;
  options?: {
    label: string;
    value: T;
    icon?: ReactElement;
  }[];
  disabled?: boolean;
  label?: string;
  contentClassName?: string;
  defaultValue?: number[];
  multiple?: boolean;
} & ViewProps;

export function ChipPicker<T extends string | number>({
  name,
  options,
  className,
  contentClassName,
  label,
  disabled: isDisabled,
  multiple,
  ...props
}: ChipProps<T>) {
  const { control } = useFormContext();
  const {
    field: { onChange, value, disabled },
  } = useController({ name, control, disabled: isDisabled });

  const values = multiple ? (value as T[]) : (value as T);

  const allOptionsIds = useMemo(
    () => options?.map((options) => options.value) || [],
    [options]
  );

  console.log(values);

  const areAllChecked =
    multiple && Array.isArray(values) && values.length === options?.length;

  useEffect(() => {
    if (Array.isArray(values) && multiple) {
      if (areAllChecked) {
        onChange(allOptionsIds);
      } else {
        onChange(values.filter((value) => allOptionsIds.includes(value)));
      }
    }

    if (!multiple && allOptionsIds.includes(value)) {
      onChange(undefined);
    }
  }, [options, areAllChecked]);

  return (
    <View className={className}>
      <View className="flex-row justify-between mb-4">
        {label ? (
          <Text className="text-md font-bold text-gray-700">{label}</Text>
        ) : null}
        {multiple ? (
          <Pressable
            onPress={() => {
              if (areAllChecked) {
                onChange([]);
              } else {
                onChange(allOptionsIds);
              }
            }}
            className="flex-row items-center gap-x-2 border px-2 py-1 rounded-lg"
            style={{
              backgroundColor: areAllChecked ? "#0ea5e9" : "transparent",
              borderColor: areAllChecked ? "#0ea5e9" : "#cbd5e1",
            }}
          >
            {areAllChecked ? (
              <SquareCheck size={18} color="white" />
            ) : (
              <Square size={18} color="#6b7280" />
            )}

            <Text
              className="font-semibold"
              style={{
                color: areAllChecked ? "white" : "#6b7280",
              }}
            >
              {areAllChecked ? "Desmarcar todos" : "Selecionar todos"}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View
        className={cn(
          "flex-row items-center gap-2 flex-wrap",
          contentClassName
        )}
        {...props}
      >
        {options?.map((chip) => {
          const isSelected =
            multiple && Array.isArray(values)
              ? values.includes(chip.value)
              : value === chip.value;

          return (
            <Pressable
              disabled={!multiple && (isSelected || disabled)}
              key={chip.value}
              onPress={() => {
                if (onChange) {
                  if (multiple && Array.isArray(values)) {
                    const newValues = isSelected
                      ? values.filter((v) => v !== chip.value)
                      : [...values, chip.value];
                    onChange(newValues);
                  } else {
                    onChange(chip.value);
                  }
                }
              }}
            >
              <Chip
                variant={isSelected ? "solid" : "outline"}
                icon={chip?.icon}
                label={chip.label}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
