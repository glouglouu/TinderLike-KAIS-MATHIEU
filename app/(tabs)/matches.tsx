import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Text, View } from "react-native";

export default function Matches() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
            <View className="bg-white rounded-lg p-4 shadow-md w-80">
                <View className="flex items-center">
                    <View className="w-1/2">
                        <Text className="text-2xl font-bold">Julie</Text>
                        <Text className="text-sm">22 ans, Lyon</Text>
                    </View>
                    <View className="w-1/2 flex items-center justify-end">
                        <Text className="text-sm">Distance : 10 km</Text>
                    </View>
                </View>
                <View className="h-64 mt-4">
                    {/* <Image source={{ uri: "https://picsum.photos/200" }} className="h-full w-full rounded-lg" /> */}
                </View>
                <View className="flex items-center mt-4">
                    <View className="w-1/2">
                        <Text className="text-sm">Bio : Hello, je m'appelle Julie et je suis une fille sympa !</Text>
                    </View>
                    <View className="w-1/2 flex items-center justify-end">
                        <View className="bg-green-500 rounded-full p-2 mr-2">
                            <Text className="text-white">Like</Text>
                        </View>
                        <View className="bg-red-500 rounded-full p-2">
                            <Text className="text-white">Dislike</Text>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
}
