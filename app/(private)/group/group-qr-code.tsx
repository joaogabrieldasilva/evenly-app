import { useGroupDetails } from "@/src/queries/groups/use-group-details";
import { router, useLocalSearchParams } from "expo-router";
import { Copy } from "lucide-react-native";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { Button } from "@/src/components/ui/button";

const { width } = Dimensions.get("window");

export default function GroupQrCode() {
  const params = useLocalSearchParams<{ groupId: string }>();
  const groupId = Number(params?.groupId);

  const { data: group } = useGroupDetails({ groupId });

  const inviteUrl = `https://evenly.com/groups/${groupId}/join`;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow px-12 pt-24"
      >
        {group ? (
          <View className="flex-1">
            <Text className="text-4xl font-bold mt-8 mb-2 text-center">
              Invite to {group?.name}
            </Text>
            <Text className="mb-20 mx-10 text-lg text-center text-slate-500">
              Share this link or QR code to invite members to your group
            </Text>
            <View className="p-4 rounded-xl border border-slate-300 self-center">
              <QRCode
                size={width * 0.7 - 24}
                value={`evenly://group/${groupId}/invite`}
              />
            </View>
            <Pressable
              onPress={() => {
                Clipboard.setStringAsync(inviteUrl);
              }}
              style={{
                width: width * 0.7,
              }}
              className="self-center"
            >
              <View className="flex-row items-end justify-between gap-x-2 mt-8 mb-4">
                <View className="gap-y-4 flex-1">
                  <Text className="text-md font-bold text-gray-700">
                    Invite link
                  </Text>

                  <View className="p-3 rounded-xl border border-slate-300 flex-1">
                    <Text numberOfLines={1}>{inviteUrl}</Text>
                  </View>
                </View>
                <View className="p-3 rounded-xl border border-slate-300">
                  <Copy size={18} />
                </View>
              </View>
            </Pressable>
            <Text className="mb-20 mx-10 text-md text-center text-slate-500">
              Anyone with this link can join your group. Share it wisely people
              you trust.
            </Text>
            <Button
              style={{
                width: width * 0.7,
              }}
              className="self-center p-4"
              text="Done"
              onPress={() => router.back()}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
