import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, Keyboard, View } from "react-native";
import {
  KeyboardProvider,
  KeyboardToolbar,
  useKeyboardState,
} from "react-native-keyboard-controller";
import { z } from "zod";

import { useEffect, useState } from "react";
import { createGroup } from "../http/groups/create-group";
import { groupKeys } from "../queries/groups/group-query-keys";
import { BottomSheetKeyboardAwareScrollView } from "./bottom-sheet-keyboard-aware-scrollview";
import {
  BottomSheetModal,
  BottomSheetModalRef,
} from "./ui/bottom-sheet-modal/bottom-sheet-modal";
import { Button } from "./ui/button";
import { TextInput } from "./ui/text-input";
import { zodResolver } from "@hookform/resolvers/zod";

const { height } = Dimensions.get("window");

type CreateGroupBottomSheetProps = {
  ref: BottomSheetModalRef;
};

const formSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve conter no minimo 3 caracteres"),
  description: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function CreateGroupBottomSheet({ ref }: CreateGroupBottomSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset } = form;

  const queryClient = useQueryClient();

  async function onSubmit({ name, description }: FormData) {
    try {
      setIsLoading(true);
      await createGroup({ name, description });

      ref.current?.close();
      reset();
      await queryClient.invalidateQueries({ queryKey: groupKeys.all });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardWillShow", (e) => {
      if (!keyboardHeight) {
        setKeyboardHeight(e.endCoordinates.height);
      }
    });

    return () => listener.remove();
  }, []);

  return (
    <>
      <BottomSheetModal
        ref={ref}
        snapPoints={["50%"]}
        keyboardBlurBehavior="restore"
        enableDismissOnClose={!isLoading}
        onChange={(index) => {
          // workaround to avoid keyboard-controller from scrolling
          // before the bottom sheet is opened
          setIsScrollEnabled(index > 0);
        }}
      >
        <FormProvider {...form}>
          <BottomSheetKeyboardAwareScrollView
            scrollEnabled={isScrollEnabled}
            keyboardShouldPersistTaps="handled"
          >
            <View className="p-6 gap-y-4">
              <TextInput
                renderInputComponent={(props) => (
                  <BottomSheetTextInput {...props} />
                )}
                name="name"
                label="Nome"
                placeholder="ex: Viagem para praia"
                autoComplete="off"
                autoCorrect={false}
                autoFocus
                disabled={isLoading}
              />
              <TextInput
                renderInputComponent={(props) => (
                  <BottomSheetTextInput {...props} />
                )}
                multiline
                name="description"
                label="Descrição"
                placeholder="ex: Despesas da viagem"
                autoComplete="off"
                autoCorrect={false}
                disabled={isLoading}
              />

              <Button
                text="Criar Grupo"
                onPress={handleSubmit(onSubmit)}
                className="mt-10"
                disabled={isLoading}
              />
            </View>
          </BottomSheetKeyboardAwareScrollView>
        </FormProvider>
        <KeyboardToolbar
          offset={{
            opened: keyboardHeight,
          }}
        />
      </BottomSheetModal>
    </>
  );
}
