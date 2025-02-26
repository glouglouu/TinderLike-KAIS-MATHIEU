import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";

export default function Matches() {
    return (
        <>
            <Stack.Screen options={{ title: 'Matches' }} />
            <ThemedView>
                <ThemedText type="title">Matches</ThemedText>
            </ThemedView>
        </>
    );
}