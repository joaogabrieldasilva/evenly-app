import { useBottomSheetModalRef } from "@/src/hooks/use-bottom-sheet-modal-ref";
import { cn } from "@/src/utils/cn";
import { CheckIcon } from "lucide-react-native";
import { ReactElement, useMemo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  Dimensions,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { BottomSheetKeyboardAwareScrollView } from "../bottom-sheet-keyboard-aware-scrollview";
import {
  BottomSheetModal,
  BottomSheetModalProps,
} from "./bottom-sheet-modal/bottom-sheet-modal";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { LegendList } from "@legendapp/list";

const { height } = Dimensions.get("window");

export type SelectInputOption = {
  label: string;
  value: string | number;
  icon?: ReactElement;
};

export type SelectInputProps = {
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  inputContainerClassname?: string;
  required?: boolean;
  options?: SelectInputOption[];
  bottomSheetProps?: Partial<BottomSheetModalProps>;
} & ViewProps;

export function SelectInput({
  name,
  label,
  className,
  disabled,
  defaultValue,
  inputContainerClassname,
  placeholder,
  required = true,
  options,
  bottomSheetProps,
  ...props
}: SelectInputProps) {
  const { control } = useFormContext();
  const { field } = useController({ control, name, defaultValue });

  const [filter, setFilter] = useState("");

  const filteredOptions = useMemo(
    () =>
      filter
        ? options?.filter((option) => option.label.includes(filter))
        : options,
    [filter, options]
  );

  const selectedOption = useMemo(
    () => options?.find((item) => item.value === field.value),
    [field.value, options]
  );

  function openModal() {
    ref.current?.present();
    Keyboard.dismiss();
  }

  const ref = useBottomSheetModalRef();

  return (
    <>
      <View className={className} {...props}>
        {label ? (
          <View className="flex-row items-center gap-x-1 mb-2">
            <Text className="text-md font-bold text-gray-700">{label}</Text>
            {!required ? (
              <Text className="text-md font-normal text-slate-500">
                (opcional)
              </Text>
            ) : null}
          </View>
        ) : null}
        <Pressable onPress={openModal}>
          <View
            className={cn(
              "flex-row p-4 py-4 items-center rounded-2xl border border-gray-300 bg-white",
              disabled && "opacity-40",
              inputContainerClassname
            )}
          >
            <TextInput
              value={field.value}
              style={{
                width: 0,
                height: 0,
              }}
              onFocus={openModal}
            />
            <View className="flex-1 text-md text-gray-600">
              {field.value ? (
                <View className="flex-row items-center gap-x-2">
                  {selectedOption?.icon}
                  <Text className="text-[#6b7280] font-semibold">
                    {selectedOption?.label}
                  </Text>
                </View>
              ) : (
                <Text className="text-[#6b7280]">{placeholder}</Text>
              )}
            </View>
          </View>
        </Pressable>
      </View>
      <BottomSheetModal
        ref={ref}
        snapPoints={["85%"]}
        keyboardBehavior="extend"
        stackBehavior="push"
        enableDynamicSizing={false}
        {...(bottomSheetProps || {})}
      >
        <BottomSheetTextInput
          value={filter}
          onChangeText={setFilter}
          placeholder="Search..."
          className="bg-gray-100 px-4 py-3 rounded-lg mx-4"
          placeholderTextColor="#6b7280"
        />

        <LegendList
          data={filteredOptions || []}
          keyExtractor={(option) => String(option.value)}
          recycleItems
          renderItem={({ item: option }) => {
            const isSelected = option.value === field.value;

            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  if (!isSelected) {
                    field.onChange(option.value);
                  }

                  setTimeout(() => {
                    ref.current?.close();
                    Keyboard.dismiss();
                  }, 100);
                }}
              >
                <View className="flex-row items-center justify-between py-4 mx-4 px-4 border-b border-b-slate-300 ">
                  <View className="flex-row gap-x-2 items-center">
                    {option?.icon}
                    <Text className="text-lg text-slate-800 font-medium">
                      {option.label}
                    </Text>
                  </View>
                  {isSelected && <CheckIcon size={16} />}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </BottomSheetModal>
    </>
  );
}
