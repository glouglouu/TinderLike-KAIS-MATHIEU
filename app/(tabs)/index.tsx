import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import "nativewind";

const { width, height } = Dimensions.get("window");

const mockProfiles = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Sophie", "Mike", "Emily", "Jack", "Sophia"][i % 10],
  age: Math.floor(Math.random() * 10) + 20,
  bio: ["Voyageur ✈️", "Sportif 🏋️", "Musicien 🎵", "Photographe 📸", "Entrepreneur 💼", "Amoureux des animaux 🐶"][i % 6],
  image: `https://randomuser.me/api/portraits/${i % 2 ? "women" : "men"}/${i + 1}.jpg`,
}));

export default function HomeScreen() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [lastSwiped, setLastSwiped] = useState(null);
  const [matches, setMatches] = useState([]);
  const [swipesLeft, setSwipesLeft] = useState(profiles.length);

  const handleSwipe = (index, direction) => {
    if (index >= profiles.length) return;
    setLastSwiped(profiles[index]);
    setProfiles((prevProfiles) => prevProfiles.filter((_, i) => i !== index));
    setSwipesLeft((prev) => prev - 1);
    if (direction === "right") setMatches([...matches, profiles[index]]);

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const undoSwipe = () => {
    if (!lastSwiped) return;
    setProfiles([lastSwiped, ...profiles]);
    setLastSwiped(null);
    setSwipesLeft((prev) => prev + 1);

    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-900">
      <View className="absolute top-5 flex-row justify-between w-full px-6">
        <Text className="text-red-400 text-lg font-bold">Match<span className="text-white">Hub</span></Text>
        <Text className="text-white text-lg">❤️ {swipesLeft} restants</Text>
      </View>

      {profiles.length > 0 ? (
        <View className="w-full flex items-center justify-center h-[75vh] px-4 md:px-0">
          <Swiper
            className="mx-auto"
            cards={profiles}
            renderCard={(profile) => (
              <View className="bg-white shadow-2xl rounded-3xl w-[85%] md:w-[40%] h-[70%] flex items-center justify-center p-4 border border-gray-300">
                <Image source={{ uri: profile.image }} className="w-full h-[75%] rounded-3xl" resizeMode="cover" />
                <View className="w-full p-4">
                  <Text className="text-3xl font-bold text-gray-900 text-center">
                    {profile.name}, {profile.age}
                  </Text>
                  <Text className="text-gray-600 text-center mt-2 text-lg italic">
                    {profile.bio}
                  </Text>
                </View>
              </View>
            )}
            onSwipedLeft={(index) => handleSwipe(index, "left")}
            onSwipedRight={(index) => handleSwipe(index, "right")}
            stackSize={5}
            backgroundColor="transparent"
            cardIndex={0}
            animateOverlayLabelsOpacity
            animateCardOpacity
            useViewOverflow={Platform.OS === "ios"}
            containerStyle={{
              width: width > 768 ? "40%" : "90%",
              height: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: "auto",
            }}
          />
        </View>
      ) : (
        <Text className="text-white text-xl font-semibold">Plus de profils disponibles 😞</Text>
      )}

      <View className="absolute bottom-16 flex-row space-x-8">
        <TouchableOpacity className="bg-red-500 p-5 rounded-full shadow-lg scale-110 active:scale-100" onPress={() => handleSwipe(0, "left")}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 p-5 rounded-full shadow-lg scale-110 active:scale-100" onPress={undoSwipe}>
          <Ionicons name="refresh" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-500 p-5 rounded-full shadow-lg scale-110 active:scale-100" onPress={() => handleSwipe(0, "right")}>
          <Ionicons name="heart" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-5">
        <Text className="text-gray-500 text-sm">{matches.length} matches trouvés ✅</Text>
      </View>
    </SafeAreaView>
  );
}
