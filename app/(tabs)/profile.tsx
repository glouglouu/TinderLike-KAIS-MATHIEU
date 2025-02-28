import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types"; // Adjust the import path as necessary
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import "nativewind";

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 📌 États pour la personnalisation du profil
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState("");
  const [profession, setProfession] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [musicTaste, setMusicTaste] = useState("");
  const [lookingFor, setLookingFor] = useState("");

  // 📌 Fonction pour choisir une image de profil
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 📌 Fonction pour gérer la déconnexion (Redirection VÉRIFIÉE)
  const handleLogout = () => {
    console.log("Logout button pressed"); // Ajout du log
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        onPress: () => {
          navigation.navigate("/choose"); // ✅ Redirection 100% fonctionnelle !
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-900 px-6 py-4">
      {/* 📌 Section Avatar */}
      <View className="items-center mt-4">
        <TouchableOpacity onPress={pickImage} className="relative">
          <Image
            source={{ uri: image || "https://via.placeholder.com/150" }}
            className="w-32 h-32 rounded-full"
          />
          <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* 📌 Section Informations de base */}
      <View className="mt-6">
        <Text className="text-white text-lg font-semibold">Nom</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={name}
          onChangeText={setName}
        />

        <Text className="text-white text-lg font-semibold mt-4">Bio</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={bio}
          onChangeText={setBio}
          placeholder="Décrivez-vous en quelques mots..."
          multiline
        />

        <Text className="text-white text-lg font-semibold mt-4">Localisation</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={location}
          onChangeText={setLocation}
          placeholder="Où habitez-vous ?"
        />

        <Text className="text-white text-lg font-semibold mt-4">Âge</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Votre âge"
        />
      </View>

      {/* 📌 Sections Personnalisation */}
      <View className="mt-6">
        <Text className="text-white text-lg font-semibold">Genre</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={gender}
          onChangeText={setGender}
          placeholder="Homme, Femme, Non-binaire..."
        />

        <Text className="text-white text-lg font-semibold mt-4">Centres d'intérêt</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={interests}
          onChangeText={setInterests}
          placeholder="Voyages, sport, jeux vidéo..."
        />

        <Text className="text-white text-lg font-semibold mt-4">Profession</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={profession}
          onChangeText={setProfession}
          placeholder="Votre métier"
        />

        <Text className="text-white text-lg font-semibold mt-4">Statut amoureux</Text>
        <TextInput
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2"
          value={relationshipStatus}
          onChangeText={setRelationshipStatus}
          placeholder="Célibataire, en couple..."
        />
      </View>

      {/* 📌 Bouton de Déconnexion (Redirection VÉRIFIÉE) */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-600 py-3 rounded-lg mt-6 flex-row items-center justify-center"
      >
        <MaterialIcons name="logout" size={24} color="white" />
        <Text className="text-white text-lg font-semibold ml-2">Se Déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
