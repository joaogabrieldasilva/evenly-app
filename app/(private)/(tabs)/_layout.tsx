import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Component } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Your groups",
          tabBarActiveTintColor: "#009933",
          tabBarLabelStyle: {
            marginTop: 8,
          },
          tabBarIcon: (props) => <Component {...props} />,
        }}
      />
    </Tabs>
  );
}
