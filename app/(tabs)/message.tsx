import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, FlatList, Image, View } from "react-native";
import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Personnat } from "@/types/types";

export default function Message() {
  const [arrayData, setArrayData] = useState<Personnat[]>([]);
  useEffect(() => {
    const fetchPersonnat = async () => {
      const response = await fetch("https://randomuser.me/api/?results=5");
      const data = await response.json();
      const splitedData: Personnat[] = data.results;
      for (let i = 0; i < splitedData.length; i++) {
        setArrayData([...arrayData, splitedData[i]]);
      }
    };
    fetchPersonnat();
  }, []);

  return (
    <ThemedView className="flex-1 items-center justify-center bg-white">
      <FlatList
        data={arrayData}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-center">
            <Image
              source={{ uri: item.picture.thumbnail }}
              className="h-16 w-16 rounded-full"
            />
          </View>
        )}
      />
      <Button
        onPress={() => console.log("Pressed")}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </ThemedView>
  );
}
