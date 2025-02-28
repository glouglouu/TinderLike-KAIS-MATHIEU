import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native"; 
import { Fontisto, AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute", 
          },
          default: {},
        }),
      }}
    >
      {/* 📌 Accueil */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Accueil",
          tabBarIcon: ({ color }) => <Fontisto name="tinder" size={24} color={color} />,
        }}
      />

      {/* 📌 Matchs */}
      <Tabs.Screen
        name="matches"
        options={{
          headerShown: false,
          title: "Matchs",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cart-heart" size={24} color={color} />,
        }}
      />

      {/* 📌 Messages */}
      <Tabs.Screen
        name="message"
        options={{
          headerShown: false,
          title: "Messages",
          tabBarIcon: ({ color }) => <AntDesign name="message1" size={24} color={color} />,
        }}
      />

      {/* 📌 Profil */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profil",
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color={color} />,
        }}
      />

      {/* 📌 Redirection après Déconnexion */}
      <Tabs.Screen
        name="auth/logout"
        options={{
          headerShown: false,
          title: "Déconnexion",
          tabBarButton: () => null, // Cache ce bouton dans la barre de navigation
        }}
      />
    </Tabs>
  );
}
