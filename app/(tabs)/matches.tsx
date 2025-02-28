import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import "nativewind";

const screenWidth = Dimensions.get("window").width;

// Génération de faux matchs
const mockMatches = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Sophie"][i % 6],
  age: Math.floor(Math.random() * 10) + 20,
  image: `https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i + 1}.jpg`,
  online: Math.random() > 0.5,
  likedYou: Math.random() > 0.5, // ✅ Indique si la personne t'a liké
  youLiked: Math.random() > 0.5, // ✅ Indique si tu as liké cette personne
}));

export default function MatchesScreen() {
  const [matches, setMatches] = useState(mockMatches);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, likedYou, youLiked

  const handleRemoveMatch = (id: number) => {
    setMatches((prev) => prev.filter((match) => match.id !== id));
  };

  const filteredMatches = matches.filter((match) => {
    if (filter === "likedYou") return match.likedYou;
    if (filter === "youLiked") return match.youLiked;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-900 px-4">
      {/* HEADER */}
      <View className="flex-row justify-between items-center mb-4 mt-4">
        <Text className="text-white text-3xl font-bold">🎯 Tes Matchs</Text>
        <Text className="text-gray-400 text-lg">❤️ {filteredMatches.length} matchs</Text>
      </View>

      {/* FILTRES */}
      <View className="flex-row justify-between bg-gray-800 p-2 rounded-xl mb-4">
        <TouchableOpacity
          className={`flex-1 p-3 rounded-xl ${filter === "all" ? "bg-blue-500" : "bg-gray-700"}`}
          onPress={() => setFilter("all")}
        >
          <Text className="text-center text-white">🏆 Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-3 mx-2 rounded-xl ${filter === "likedYou" ? "bg-blue-500" : "bg-gray-700"}`}
          onPress={() => setFilter("likedYou")}
        >
          <Text className="text-center text-white">❤️ Ils t'ont liké</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-3 rounded-xl ${filter === "youLiked" ? "bg-blue-500" : "bg-gray-700"}`}
          onPress={() => setFilter("youLiked")}
        >
          <Text className="text-center text-white">💌 Tes likes</Text>
        </TouchableOpacity>
      </View>

      {/* BARRE DE RECHERCHE */}
      <View className="flex-row items-center bg-gray-800 p-4 rounded-xl mb-6">
        <Ionicons name="search" size={20} color="white" />
        <TextInput
          className="text-white ml-3 flex-1"
          placeholder="Rechercher..."
          placeholderTextColor="#bbb"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* LISTE DES MATCHS - RESPONSIVE */}
      <FlatList
        data={filteredMatches.filter((match) =>
          match.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={screenWidth > 800 ? 3 : 1} // ✅ Grille sur PC, liste sur mobile
        columnWrapperStyle={screenWidth > 800 ? { justifyContent: "space-between" } : null}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        renderItem={({ item }) => (
          <View className="bg-gray-800 p-6 rounded-3xl mb-5 shadow-lg shadow-gray-700 w-full md:w-[30%] mx-auto">
            {/* IMAGE */}
            <Image source={{ uri: item.image }} className="w-full h-64 rounded-3xl" />

            {/* INFOS */}
            <View className="mt-4">
              <Text className="text-white text-2xl font-bold">
                {item.name}, {item.age}
              </Text>
              <Text className={`${item.online ? "text-green-400" : "text-red-400"} text-lg`}>
                {item.online ? "🟢 En ligne" : "🔴 Hors ligne"}
              </Text>
            </View>

            {/* BOUTONS */}
            <View className="flex-row justify-around mt-4">
              <TouchableOpacity
                onPress={() => handleRemoveMatch(item.id)}
                className="bg-red-500 p-5 rounded-full"
              >
                <MaterialIcons name="delete" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-500 p-5 rounded-full"
                onPress={() => alert(`Chat avec ${item.name}`)}
              >
                <Ionicons name="chatbubbles" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center text-lg">
            Aucun match trouvé 😞
          </Text>
        }
      />
    </SafeAreaView>
  );
}
