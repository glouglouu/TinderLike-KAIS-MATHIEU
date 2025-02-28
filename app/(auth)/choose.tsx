import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import "nativewind";

export default function ChooseAuthScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center px-6">
      {/* 🔹 Titre */}
      <Text className="text-white text-3xl font-bold mb-8">
        Bienvenue ! Choisissez une option :
      </Text>

      {/* 🔹 Bouton "Se Connecter" */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="bg-blue-500 py-3 px-6 rounded-lg w-full mb-4"
      >
        <Text className="text-white text-center text-lg">Se Connecter</Text>
      </TouchableOpacity>

      {/* 🔹 Bouton "S'inscrire" */}
      <TouchableOpacity
        onPress={() => router.push("/register")}
        className="bg-green-500 py-3 px-6 rounded-lg w-full"
      >
        <Text className="text-white text-center text-lg">S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}
