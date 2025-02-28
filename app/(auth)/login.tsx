import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import "nativewind";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
    setError("");
    if (!validateEmail(email)) {
      setError("Adresse e-mail invalide.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)/profile"); // Rediriger vers le profil après connexion
    }, 2000);
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 px-6">
      <Text className="text-3xl font-bold text-white mb-6">Connexion</Text>

      {error ? (
        <Text className="text-red-500 text-sm mb-4">{error}</Text>
      ) : null}

      {/* Champ Email */}
      <View className="w-full mb-4">
        <Text className="text-white mb-2">E-mail</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-3 rounded-lg w-full"
          placeholder="Entrez votre email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      {/* Champ Mot de passe */}
      <View className="w-full mb-4">
        <Text className="text-white mb-2">Mot de passe</Text>
        <View className="flex-row items-center bg-gray-800 rounded-lg px-4">
          <TextInput
            className="text-white flex-1 py-3"
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bouton "Se souvenir de moi" */}
      <TouchableOpacity className="flex-row items-center mb-4">
        <Ionicons name="checkbox-outline" size={20} color="white" />
        <Text className="text-white ml-2">Se souvenir de moi</Text>
      </TouchableOpacity>

      {/* Bouton Connexion */}
      <TouchableOpacity
        className={`w-full bg-blue-600 py-3 rounded-lg items-center ${loading ? "opacity-50" : ""}`}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-lg">Se connecter</Text>}
      </TouchableOpacity>

      {/* Lien vers Inscription */}
      <TouchableOpacity className="mt-4" onPress={() => router.push("/auth/register")}>
        <Text className="text-gray-400">Pas encore de compte ? <Text className="text-blue-400">Inscrivez-vous</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
