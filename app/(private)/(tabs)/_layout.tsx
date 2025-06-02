import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Component, Group, GroupIcon, Users } from "lucide-react-native";
import { useRefreshToken } from "@/src/hooks/use-refresh-token";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "My groups",
          tabBarActiveTintColor: "#0ea5e9",
          tabBarLabelStyle: {
            marginTop: 8,
          },
          tabBarIcon: (props) => <Users {...props} />,
        }}
      />
    </Tabs>
  );
}
