import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { DeviceEventEmitter, Dimensions, Keyboard, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import { z } from "zod";
import { Calendar } from "react-native-calendars";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { createGroupExpense } from "../../src/http/transactions/create-group-expense";
import { groupKeys } from "../../src/queries/groups/group-query-keys";
import { useAuth } from "../../src/store/auth-store";
import { clearCurrency } from "../../src/utils/clear-currency";
import { formatCurrency } from "../../src/utils/format-currency";
import { BottomSheetKeyboardAwareScrollView } from "../../src/components/bottom-sheet-keyboard-aware-scrollview";
import {
  BottomSheetModal,
  BottomSheetModalRef,
} from "../../src/components/ui/bottom-sheet-modal/bottom-sheet-modal";
import { Button } from "../../src/components/ui/button";
import { TextInput } from "../../src/components/ui/text-input";
import { CurrencyTextInput } from "../../src/components/ui/currency-text-input";
import { useGroupMembers } from "../../src/queries/groups/use-group-members";
import {
  SelectInput,
  SelectInputOption,
} from "../../src/components/ui/select-input";
import { router, useLocalSearchParams } from "expo-router";
import { FullWindowOverlay } from "react-native-screens";
import { ProfilePicture } from "@/src/components/ui/profile-picture";
import { DatePicker } from "@/src/components/ui/date-picker";
import { ChipPicker } from "@/src/components/ui/chip-picker";
import { useGroupTransaction } from "@/src/queries/groups/use-group-transaction";
import { updateGroupExpense } from "@/src/http/transactions/update-group-expense";
import { format } from "date-fns";

const formSchema = z.object({
  description: z.string(),
  amount: z.string().refine((value) => clearCurrency(value) > 0, {
    message: "O valor deve ser maior que zero",
  }),
  createdAt: z.string({ message: "A data deve ser informada" }),
  category: z.string(),
  payerId: z.number({ required_error: "O pagador é obrigatório" }),
  splittedWithIds: z.array(z.number()),
});

const categoryOptions: SelectInputOption[] = [
  {
    label: "Food",
    value: "Food",
  },
  {
    label: "House",
    value: "House",
  },
];

type FormData = z.infer<typeof formSchema>;

export default function CreateExpense() {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const params = useLocalSearchParams<{
    groupId?: string;
    transactionId?: string;
  }>();

  console.log(params);

  const groupId = Number(params?.groupId);
  const transactionId = Number(params?.transactionId);

  const { data: groupMembers = [] } = useGroupMembers({ groupId });

  const { data: transaction } = useGroupTransaction({ groupId, transactionId });

  const form = useForm<FormData>({
    defaultValues: !transactionId
      ? {
          description: "",
          amount: formatCurrency(0),
          category: "",
          createdAt: new Date().toISOString(),
          payerId: userId!,
          splittedWithIds: [],
        }
      : {},
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, setValue, watch, reset } = form;

  const payerId = watch("payerId");
  const amount = watch("amount");

  const queryClient = useQueryClient();

  const paidByOptions = useMemo(
    () =>
      groupMembers?.map((item) => ({
        label: item.name,
        value: item.id,
        icon: (
          <ProfilePicture
            userName={item.name}
            uri={item.profileImage}
            size="xs"
          />
        ),
      })),
    [groupMembers, payerId]
  );

  const splitWithOptions = useMemo(
    () => paidByOptions?.filter((option) => option.value !== payerId),
    [paidByOptions, payerId]
  );

  async function onSubmit({
    description,
    amount,
    category,
    payerId,
    createdAt,
    splittedWithIds,
  }: FormData) {
    try {
      setIsLoading(true);
      console.log({
        description,
        amount: clearCurrency(amount) / 100,
        category,
        payerId,
        createdAt,
        splittedWithIds,
        groupId,
      });
      if (!transaction?.id) {
        await createGroupExpense({
          description,
          amount: clearCurrency(amount) / 100,
          category,
          payerId,
          createdAt,
          splittedWithIds,
          groupId,
        });

        DeviceEventEmitter.emit("expense-created");
      } else {
        await updateGroupExpense({
          transactionId: transaction.id,
          description,
          amount: clearCurrency(amount) / 100,
          category,
          payerId,
          createdAt,
          splittedWithIds,
          groupId,
        });
      }

      await queryClient.invalidateQueries({
        queryKey: groupKeys.all,
      });
      router.back();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (transaction) {
      reset({
        description: transaction.description,
        amount: formatCurrency(transaction.amount),
        category: transaction.category,
        createdAt: format(transaction.createdAt, "yyyy-MM-dd"),
        payerId: transaction?.paidBy?.id,
        splittedWithIds: transaction?.splittedWithMembers.map(
          (item) => item.id
        ),
      });
    } else {
      setValue(
        "splittedWithIds",
        splitWithOptions?.map((member) => member.value)
      );
    }
  }, [groupMembers, transaction]);

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardWillShow", (e) => {
      if (!keyboardHeight) {
        setKeyboardHeight(e.endCoordinates.height);
      }
    });

    return () => listener.remove();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <FormProvider {...form}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow"
        >
          <View className="flex-1 p-6 gap-y-4">
            <CurrencyTextInput
              name="amount"
              autoComplete="off"
              autoFocus
              autoCorrect={false}
              className="mt-6 mb-12"
              selection={
                amount?.length
                  ? { start: amount.length, end: amount.length }
                  : undefined
              }
            />
            <TextInput
              multiline
              name="description"
              label="Descrição"
              placeholder="ex: Despesas da viagem"
              required={false}
              autoComplete="off"
              autoCorrect={false}
              disabled={isLoading}
            />
            <View className="flex-row items-center justify-between gap-x-4">
              <SelectInput
                name="category"
                label="Categoria"
                required={false}
                placeholder="Categoria"
                className="flex-1"
                options={categoryOptions}
                disabled={isLoading}
              />
              <DatePicker
                name="createdAt"
                label="Data"
                placeholder="Data da despesa"
                className="flex-1"
                disabled={isLoading}
              />
            </View>

            <SelectInput
              name="payerId"
              label="Pago por"
              placeholder="Pago por"
              options={paidByOptions}
              disabled={isLoading}
              inputContainerClassname="py-3"
            />
            <ChipPicker
              name="splittedWithIds"
              label="Dividir com"
              multiple
              options={splitWithOptions}
              disabled={isLoading}
            />
          </View>
          <Button
            text={transactionId ? "Salvar despesa" : "Criar despesa"}
            onPress={handleSubmit(onSubmit)}
            className="mt-10 mb-14 mx-6"
            disabled={isLoading}
          />
        </KeyboardAwareScrollView>
      </FormProvider>
      <KeyboardToolbar />
    </View>
  );
}
