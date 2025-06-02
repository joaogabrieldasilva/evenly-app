import { cn } from "@/src/utils/cn";
import { ChartColumn } from "lucide-react-native";
import { ReactElement } from "react";
import { Pressable, Text, View, ViewProps } from "react-native";

type SegmentedPickerProps<T extends string> = {
  selectedValue: T;
  setSelectedValue?: (value: T) => void;
  options: {
    label: string;
    value: T;
    renderIcon?: (params: { color: string }) => ReactElement;
  }[];
} & ViewProps;

export function SegmentedPicker<T extends string>({
  selectedValue,
  setSelectedValue,
  options,
  className,
  ...props
}: SegmentedPickerProps<T>) {
  return (
    <View
      className={cn(
        "bg-slate-100 rounded-lg px-3 py-2 flex-row items-center",
        className
      )}
      {...props}
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <Pressable
            key={option.value}
            disabled={isSelected}
            onPress={() => setSelectedValue && setSelectedValue(option.value)}
            className="flex-row items-center gap-x-2 px-4 py-2 rounded-lg flex-1 justify-center disabled:bg-white disabled:shadow-sm"
          >
            {option.renderIcon &&
              option.renderIcon({ color: isSelected ? "black" : "#64748b" })}
            <Text
              style={{ color: isSelected ? "black" : "#64748b" }}
              className="text-md font-normal"
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
