import { Button } from "@/src/components/ui/button";
import { TextInput } from "@/src/components/ui/text-input";
import { api } from "@/src/http/api";
import { signIn } from "@/src/http/auth/sign-in";
import { useAuthActions } from "@/src/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

const schema = z.object({
  email: z
    .string({ required_error: "E-mail is required" })
    .email({ message: "E-mail must be valid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const { setLoggedUser } = useAuthActions();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "joao@gmail.com",
      password: "123456",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const response = await signIn({ email, password });

      setLoggedUser(response.user);
      await AsyncStorage.setItem("@evenly/authToken", response.auth.token);
      await AsyncStorage.setItem(
        "@evenly/refreshToken",
        response.auth.refreshToken
      );

      api.defaults.headers.Authorization = "Bearer " + response.auth.token;
      router.push("/(private)/(tabs)");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <FormProvider {...form}>
        <View className="gap-y-4">
          <TextInput name="email" placeholder="E-mail" />
          <TextInput name="password" placeholder="Password" />
        </View>
      </FormProvider>
      <Button text="Login" className="mt-4" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
