import { useBottomSheetModalRef } from "@/src/hooks/use-bottom-sheet-modal-ref";
import { cn } from "@/src/utils/cn";
import { Controller, useController, useFormContext } from "react-hook-form";
import {
  Keyboard,
  Pressable,
  Text,
  View,
  ViewProps,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BottomSheetModal } from "../bottom-sheet-modal/bottom-sheet-modal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ReactElement, useMemo } from "react";
import { BottomSheetKeyboardAwareScrollView } from "../bottom-sheet-keyboard-aware-scrollview";
import { CheckIcon } from "lucide-react-native";

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
  options?: SelectInputOption[];
} & ViewProps;

export function SelectInput({
  name,
  label,
  className,
  disabled,
  defaultValue,
  inputContainerClassname,
  placeholder,
  options,
  ...props
}: SelectInputProps) {
  const { control } = useFormContext();
  const { field } = useController({ control, name, defaultValue });

  const selectedOption = useMemo(
    () => options?.find((item) => item.value === field.value),
    [field.value, options]
  );

  function openModal() {
    Keyboard.dismiss();
    ref.current?.present();
  }

  const ref = useBottomSheetModalRef();

  return (
    <>
      <View className={className}>
        {label ? (
          <Text className="text-md font-bold text-gray-700 mb-2">{label}</Text>
        ) : null}
        <Pressable onPress={openModal}>
          <View
            className={cn(
              "flex-row p-4 items-center rounded-2xl border border-gray-300 bg-white",
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
                  <Text className="text-[#6b7280]">
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
        snapPoints={["70%"]}
        enableDynamicSizing={false}
      >
        <BottomSheetKeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          {options?.map((option) => {
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
          })}
        </BottomSheetKeyboardAwareScrollView>
      </BottomSheetModal>
    </>
  );
}
