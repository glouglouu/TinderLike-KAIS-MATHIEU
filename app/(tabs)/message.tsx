import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const mockMessages = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Sophie", "Mike", "Emily", "Jack", "Sophia"][i % 10],
  lastMessage: ["Salut !", "Ça va ?", "On se voit demain ?", "Ok !", "😂", "Je t'appelle après", "Cool 😎"][i % 7],
  time: ["10:21", "15:47", "Hier", "20:30", "23:59", "12:10"][i % 6],
  avatar: `https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i + 1}.jpg`,
  unread: i % 4 === 0, // Message non lu aléatoire
}));

export default function MessageScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <View className="flex-1 bg-gray-900">
      {/* 🔍 Barre de recherche */}
      <View className="flex-row items-center bg-gray-800 p-3 rounded-xl mx-4 mt-4">
        <Ionicons name="search" size={20} color="white" className="mr-2" />
        <TextInput
          className="text-white flex-1"
          placeholder="Rechercher..."
          placeholderTextColor="gray"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 📝 Liste des conversations */}
      <ScrollView className="mt-4 px-4">
        {mockMessages
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() => router.push(`/chat?user=${user.name}`)}
              className="flex-row items-center p-4 bg-gray-800 rounded-2xl mb-3"
            >
              {/* 📷 Avatar */}
              <Image
                source={{ uri: user.avatar }}
                className="w-14 h-14 rounded-full border border-gray-700"
              />

              {/* 📝 Infos du message */}
              <View className="flex-1 ml-3">
                <Text className="text-white text-lg font-semibold">
                  {user.name}
                </Text>
                <Text className="text-gray-400">{user.lastMessage}</Text>
              </View>

              {/* 🕒 Heure et message non lu */}
              <View className="items-end">
                <Text className="text-gray-500">{user.time}</Text>
                {user.unread && (
                  <View className="bg-green-500 w-5 h-5 rounded-full items-center justify-center mt-1">
                    <Text className="text-white text-xs font-bold">1</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
