import { useBottomSheetModalRef } from "@/src/hooks/use-bottom-sheet-modal-ref";
import { cn } from "@/src/utils/cn";
import { format } from "date-fns";
import { useController, useFormContext } from "react-hook-form";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
  ViewProps,
} from "react-native";
import { Calendar } from "react-native-calendars";
import {
  BottomSheetModal,
  BottomSheetModalProps,
} from "./bottom-sheet-modal/bottom-sheet-modal";
import { dateWithoutTimezone } from "@/src/utils/date-without-timezone";
import { Calendar1, CalendarIcon } from "lucide-react-native";

export type DatePickerProps = {
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  inputContainerClassname?: string;
  bottomSheetProps?: Partial<BottomSheetModalProps>;
} & ViewProps;

export function DatePicker({
  name,
  label,
  className,
  disabled,
  defaultValue,
  inputContainerClassname,
  placeholder,
  bottomSheetProps,
  ...props
}: DatePickerProps) {
  const { control } = useFormContext();
  const { field } = useController({ control, name, defaultValue });

  console.log(field.value);
  function openModal() {
    ref.current?.present();
    Keyboard.dismiss();
  }

  const ref = useBottomSheetModalRef();

  return (
    <>
      <View className={className} {...props}>
        {label ? (
          <Text className="text-md font-bold text-gray-700 mb-2">{label}</Text>
        ) : null}
        <Pressable onPress={openModal} disabled={disabled}>
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
            <View className="flex-1 flex-row items-center justify-between text-md text-gray-600">
              {field.value ? (
                <View className="flex-row items-center gap-x-2">
                  {field.value ? (
                    <Text className="text-[#6b7280] font-semibold">
                      {format(
                        dateWithoutTimezone(new Date(field.value)),
                        "dd/MM/yyyy"
                      )}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <Text className="text-[#6b7280]">{placeholder}</Text>
              )}
              <CalendarIcon size={16} color="#6b7280" />
            </View>
          </View>
        </Pressable>
      </View>
      <BottomSheetModal
        ref={ref}
        snapPoints={["50%"]}
        keyboardBehavior="extend"
        stackBehavior="push"
        {...(bottomSheetProps || {})}
      >
        <Calendar
          date={new Date(field.value || new Date()).toISOString()}
          onDayPress={(e) => {
            console.log(e);
            field.onChange(e.dateString);
            ref.current?.close();
          }}
          markedDates={
            field.value
              ? {
                  [field.value]: {
                    selected: true,
                    selectedColor: "#0ea5e9",
                  },
                }
              : {}
          }
        />
      </BottomSheetModal>
    </>
  );
}
