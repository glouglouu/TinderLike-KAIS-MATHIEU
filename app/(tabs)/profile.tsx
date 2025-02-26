import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";



export default function Profile() {
    return (
        <>
            <Stack.Screen options={{ title: 'Matches' }} />
            <ThemedView>
                <ThemedText className="blue bg red" type="title">Profile</ThemedText>
            </ThemedView>
        </>
    );
}