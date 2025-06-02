import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";

export function useBottomSheetModalRef() {
  return useRef<BottomSheetModal>(null);
}
