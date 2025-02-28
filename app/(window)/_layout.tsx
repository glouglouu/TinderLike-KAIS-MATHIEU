import { Stack, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack>
      {/* 📌 chat */}
      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
