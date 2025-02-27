import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Profile() {
  return (
    <>
      <View>
        <ThemedText className="blue bg red" type="title">
          Profile
        </ThemedText>
      </View>
    </>
  );
}
