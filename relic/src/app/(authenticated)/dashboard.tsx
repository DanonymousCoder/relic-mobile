import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

// Dummy data for now
const ARCHIVES = [
  {
    id: "1",
    date: "August, 2026",
    title: "Iceland",
    photos: 42,
    videos: 2,
    saved: "1.2 GB",
    imageURL:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    date: "July, 2026",
    title: "Tokyo",
    photos: 2,
    videos: 10,
    saved: "2.2 GB",
    imageURL:
      "https://images.unsplash.com/photo-1542051812871-7575017121a1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    date: "December, 2026",
    title: "Portraits",
    photos: 22,
    videos: 0,
    saved: "800 MB",
    imageURL:
      "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=800&auto=format&fit=crop",
  },
];

export default function DashboardScreen() {
  return (
    <SafeAreaView>
      {/** Top Header */}
      <View>
        <Text>Relic.</Text>
        <View>
          <TouchableOpacity>{/** Filter Icon */}</TouchableOpacity>
          <TouchableOpacity>{/** Settings Icon */}</TouchableOpacity>
        </View>
      </View>

      {/** Main Section */}
      <ScrollView>
        {ARCHIVES.map((archive) => {
          return (
            <TouchableOpacity
              key={archive.id}
              onPress={() => router.push("/(authenticated)/viewer")}
              className="border border-gray-800 p-4 mb-6"
              activeOpacity={0.8}
            >
              {/** Card Header */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-400 text-[10px] tracking-widest font-mono uppercase">
                  {archive.date}
                </Text>
                <Text className="text-[#c69c6d] text-[10px] tracking-widest font-mono uppercase">
                  Archived
                </Text>
              </View>
              {/** Main Image */}
              <Image
                source={{ uri: archive.imageURL }}
                className="w-full spect-4/3 bg-neutal-900"
                resizeMode="cover"
              />
              {/** Card Footer */}
              <View>
                <Text>{archive.title}</Text>
                <Text>
                  {archive.photos} Photos, {archive.videos} Videos
                </Text>
                <Text>Saved {archive.saved}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/** Bottom Navigation Bar */}
      <View>
        <TouchableOpacity>
          <View />
          <Text>Archive</Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity>{/** Add button */}</TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
