import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import "nativewind";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = () => {
    setError("");
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender ||
      !bio ||
      !location
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Adresse e-mail invalide.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)"); // Rediriger vers le profil après inscription
    }, 2000);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 px-6">
      <Text className="text-3xl font-bold text-white mb-6">Inscription</Text>

      {error && <Text className="text-red-500 text-sm mb-4">{error}</Text>}

      {/* Photo de profil */}
      <TouchableOpacity className="mb-4" onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} className="w-24 h-24 rounded-full" />
        ) : (
          <View className="w-24 h-24 rounded-full bg-[#374151] items-center justify-center">
            <MaterialIcons name="add-a-photo" size={32} color="#fff" />
          </View>
        )}
      </TouchableOpacity>

      {/* Champ Nom */}
      <View className="w-full mb-4">
        <Text className="text-white mb-2">Nom complet</Text>
        <TextInput
          id="name"
          className="bg-gray-800 text-white px-4 py-3 rounded-lg w-full"
          placeholder="Nom complet"
          placeholderTextColor="#aaa"
          onChangeText={setName}
          value={name}
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-white mb-2">E-mail</Text>
        <TextInput
          id="email"
          className="bg-gray-800 text-white px-4 py-3 rounded-lg w-full"
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-white mb-2">Mot de passe</Text>
        <View className="flex-row items-center bg-gray-800 rounded-lg px-4">
          <TextInput
            className="text-white flex-1 py-3"
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
        </View>
      </View>

      <View className="w-full mb-6">
        <Text className="text-white mb-2">Confirmation du mot de passe</Text>
        <View className="flex-row items-center bg-gray-800 rounded-lg px-4">
          <TextInput
            className="text-white flex-1 py-3"
            placeholder="Confirmez votre mot de passe"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
      </View>

      {/* Genre */}
      <View className="w-full flex-row gap-x-4 mb-4 items-end">
        <Text className="text-white mb-2">Genre</Text>
        {["Homme", "Femme"].map((option) => (
          <TouchableOpacity
            id="genre"
            key={option}
            onPress={() => setGender(option)}
            className={`
              px-4 py-2 rounded-md
              ${gender === option ? "bg-[#2563eb]" : "bg-[#374151]"}
            `}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bio */}
      <View className="w-full mb-4">
        <Text className="text-white mb-2">Bio</Text>
        <TextInput
          id="bio"
          className="bg-gray-800 text-white px-4 py-3 rounded-lg w-full"
          placeholder="Ajoutez une courte biographie..."
          placeholderTextColor="#aaa"
          onChangeText={setBio}
          value={bio}
        />
      </View>

      {/* Localisation */}
      <View className="w-full mb-6">
        <Text className="text-white mb-2">Localisation</Text>
        <TextInput
          id="country"
          className="bg-gray-800 text-white px-4 py-3 rounded-lg w-1/3"
          placeholder="Ville / Pays"
          placeholderTextColor="#aaa"
          onChangeText={setLocation}
          value={location}
        />
      </View>

      {/* Bouton Inscription */}
      <TouchableOpacity
        className={`w-full bg-blue-600 py-3 rounded-lg items-center ${
          loading ? "opacity-50" : ""
        }`}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg">S'inscrire</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity className="mt-4" onPress={() => router.push("/login")}>
        <Text className="text-gray-400">
          Déjà un compte ? <Text className="text-blue-400">se connecter</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
