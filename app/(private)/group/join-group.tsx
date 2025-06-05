import { useGroupDetails } from "@/src/queries/groups/use-group-details";
import { router, useLocalSearchParams } from "expo-router";
import {
  Calendar,
  Calendar1,
  CalendarDays,
  CalendarX2,
  Copy,
  DollarSign,
  UserPlus,
  Users,
} from "lucide-react-native";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import { Button } from "@/src/components/ui/button";
import { useGroupMembers } from "@/src/queries/groups/use-group-members";
import { ProfilePicture } from "@/src/components/ui/profile-picture";
import { format } from "date-fns";
import { formatCurrency } from "@/src/utils/format-currency";

const { width } = Dimensions.get("window");

export default function JoinGroup() {
  const params = useLocalSearchParams<{ groupId: string }>();
  const groupId = Number(params?.groupId);

  const { data: group } = useGroupDetails({ groupId });

  const { data: groupMembers = [] } = useGroupMembers({ groupId });

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow px-12 py-24"
      >
        {group ? (
          <View className="flex-1">
            <View className="flex-1">
              <Text className="text-4xl font-bold mt-8 mb-2 text-center">
                Join {group?.name}
              </Text>
              <Text className="mb-20 mx-10 text-lg text-center text-slate-500">
                You've been invited to join this collaborative group.
              </Text>
              <View className="gap-y-4">
                <View>
                  <View className="flex-row items-center gap-x-1 mb-2 mx-2">
                    <Users size={16} color="#6b7280" />
                    <Text className="text-lg text-gray-500">
                      3 members already in this group.
                    </Text>
                  </View>
                  <View className="flex-row flex-wrap gap-4 bg-slate-100 rounded-lg p-2">
                    {groupMembers.map((member) => (
                      <View
                        key={member.id}
                        className="flex-row items-center gap-x-1"
                      >
                        <ProfilePicture
                          userName={member.name}
                          uri={member.profileImage}
                          size="sm"
                        />
                        <Text className="text-gray-500">{member.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View className="bg-slate-100 rounded-lg px-4 py-3">
                  <View className="flex-row items-center flex-wrap gap-x-4">
                    <CalendarDays size={32} color="#0ea5e9" />
                    <View className="gap-y-2">
                      <Text className="font-semibold text-md text-gray-800">
                        Created on
                      </Text>
                      <Text className="text-slate-500 font-medium text-md">
                        {format(group.createdAt, "dd/MMMM/yyyy")}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="bg-slate-100 rounded-lg px-4 py-3">
                  <View className="flex-row items-center flex-wrap gap-x-4">
                    <DollarSign size={32} color="#0ea5e9" />
                    <View className="gap-y-2">
                      <Text className="font-semibold text-md text-gray-800">
                        Total spent
                      </Text>
                      <Text className="text-slate-500 font-medium text-md">
                        {formatCurrency(group.totalExpenses)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Button
              className="p-4 mt-10"
              text="Go to group"
              leftIcon={<UserPlus color="white" size={16} />}
              onPress={() => router.back()}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
