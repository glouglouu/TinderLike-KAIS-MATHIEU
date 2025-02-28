import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import "nativewind";

export default function ChatScreen() {
  const { user } = useLocalSearchParams(); // Récupération du nom de l'utilisateur
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, text: "Salut !", sender: "me", time: "10:21" },
    { id: 2, text: "Hey ! Comment tu vas ?", sender: "other", time: "10:22" },
    { id: 3, text: "Je vais bien et toi ?", sender: "me", time: "10:23" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "me", time: "10:30" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-900"
    >
      {/* 🔙 Header */}
      <View className="flex-row items-center p-4 bg-gray-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold ml-3">{user}</Text>
      </View>

      {/* 💬 Messages */}
      <ScrollView className="flex-1 p-4">
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`mb-2 p-3 max-w-[75%] rounded-xl ${
              msg.sender === "me"
                ? "bg-blue-500 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            <Text className="text-white">{msg.text}</Text>
            <Text className="text-gray-300 text-xs mt-1 text-right">{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* ✍️ Barre de saisie */}
      <View className="flex-row items-center bg-gray-800 p-3">
        <TextInput
          className="flex-1 text-white bg-gray-700 p-2 rounded-lg"
          placeholder="Écrire un message..."
          placeholderTextColor="gray"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage} className="ml-3">
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
