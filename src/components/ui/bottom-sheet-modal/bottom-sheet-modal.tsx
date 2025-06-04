import { ReactNode, Ref, RefObject } from "react";
import {
  BottomSheetView,
  BottomSheetBackdrop as OriginalBottomSheetBackdrop,
  BottomSheetModal as OriginalBottomSheetModal,
  BottomSheetModalProps as OriginalBottomSheetModalProps,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { Keyboard, Platform, Pressable, StyleSheet } from "react-native";
import { BottomSheetBackdrop } from "./bottom-sheet-backdrop";
import { FullWindowOverlay } from "react-native-screens";

export type BottomSheetModalRef = RefObject<OriginalBottomSheetModal | null>;

export type BottomSheetModalProps = {
  ref: BottomSheetModalRef;
  children?: ReactNode;
} & OriginalBottomSheetModalProps;

export function BottomSheetModal({
  ref,
  children,
  ...props
}: BottomSheetModalProps) {
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 500,
  });

  return (
    <OriginalBottomSheetModal
      ref={ref}
      enableDismissOnClose
      animationConfigs={animationConfigs}
      backdropComponent={(props) =>
        Platform.OS === "ios" ? (
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => {
              Keyboard.dismiss();
              ref?.current?.close();
            }}
          >
            <BottomSheetBackdrop {...props} />
          </Pressable>
        ) : (
          <OriginalBottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )
      }
      enableDynamicSizing={false}
      {...props}
    >
      <BottomSheetView className="flex-1">{children}</BottomSheetView>
    </OriginalBottomSheetModal>
  );
}
