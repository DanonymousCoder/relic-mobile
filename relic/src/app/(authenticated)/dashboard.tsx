import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { getShoots, createShoot, uploadFiles } from "../../services/api";
import { useEffect, useState } from "react";
import { Modal, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Dummy data for now
const ARCHIVES = [
  {
    id: "1",
    date: "August, 2026",
    title: "Iceland",
    photos: 42,
    videos: 2,
    saved: "1.2 GB",
    imageUrl:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    date: "July, 2026",
    title: "Tokyo",
    photos: 2,
    videos: 10,
    saved: "2.2 GB",
    imageUrl:
      "https://images.unsplash.com/photo-1542051812871-7575017121a1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    date: "December, 2026",
    title: "Portraits",
    photos: 22,
    videos: 0,
    saved: "800 MB",
    imageUrl:
      "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=800&auto=format&fit=crop",
  },
];

interface Shoot {
  id: string;
  name: string;
  file_count: number;
  total_size: number;
  archived_at?: string;
}

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 MB";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const formatDate = (isoString?: string) => {
  if (!isoString) return "Processing";
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export default function DashboardScreen() {
  const [shoots, setShoots] = useState<Shoot[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newShootName, setNewShootName] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadShoots = async () => {
    setLoading(true);

    try {
      const data = (await getShoots()) as Shoot[];
      setShoots(data || []);
    } catch (error) {
      console.error("Failed to fetch shoots: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShoots();
  }, []);

  const handleUpload = async () => {
    if (!newShootName.trim()) {
      Alert.alert("Name required", "Please enter a name for this archive.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (result.canceled) return;

    setUploading(true);

    try {
      const shoot = (await createShoot(newShootName)) as any;

      const formData = new FormData();
      result.assets.forEach((asset, index) => {
        formData.append("files", {
          uri: asset.uri,
          name: asset.fileName || `image_${index}.jpg`,
          type: asset.mimeType || `image/jpeg`,
        } as any);
      });

      await uploadFiles(shoot.id, formData);

      setModalVisible(false);
      setNewShootName("");
      loadShoots();
    } catch (error) {
      console.error("Upload failed", error);
      Alert.alert("Error", "Failed to upload archive.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#111111] flex-1" edges={["top"]}>
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/80 justify-center items-center px-6">
          <View className="bg-[#1A1A1A] w-full p-6 border border-gray-700 rounded-xl">
            <Text className="text-white text-2xl font-serif mb-4">
              New Archive
            </Text>
            <TextInput
              value={newShootName}
              onChangeText={setNewShootName}
              placeholder="e.g... Portrait AUG 26"
              placeholderTextColor="#666666"
              className="border border-gray-400 text-white p-4 mb-6 rounded bg-[#111]"
            />

            <View className="flex-row justify-end gap-4">
              <TouchableOpacity
                className="p-3"
                disabled={uploading}
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-200 font-bold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleUpload}
                disabled={uploading}
                className={`${uploading ? "bg-[#c69c6d]/50" : "bg-[#c69c6d]"} px-6 py-3 rounded`}
              >
                <Text className="text-white font-bold">
                  {uploading ? "Uploading..." : "Select Photos"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/** Top Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-white font-bold text-4xl font-serif tracking-wide">
          Relic.
        </Text>
        <View className="flex-row gap-6">
          <TouchableOpacity>
            {/** Filter Icon */}
            <Feather name="filter" color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity>
            {/** Settings Icon */}{" "}
            <Feather name="settings" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/** Main Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-32"
      >
        {loading ? (
          <ActivityIndicator size="large" className="mt-20" color="#c69c6d" />
        ) : (
          shoots.map((shoot) => {
            return (
              <TouchableOpacity
                key={shoot.id}
                onPress={() =>
                  router.push(`/(authenticated)/viewer?id=${shoot.id}`)
                }
                className="border border-gray-600 p-4 mb-6"
                activeOpacity={0.8}
              >
                {/** Card Header */}
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-gray-100 text-[18px] tracking-widest font-mono uppercase">
                    {formatDate(shoot.archived_at)}
                  </Text>
                  <Text className="text-[#c69c6d] text-[18px] tracking-widest font-mono uppercase">
                    {shoot.archived_at ? "Archived" : "Pending"}
                  </Text>
                </View>
                {/** Main Image */}
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                  }}
                  className="w-full aspect-[4/3] bg-neutral-900"
                  resizeMode="cover"
                />
                {/** Card Footer */}
                <View className="mt-4">
                  <Text className="text-white text-3xl font-serif mb-2">
                    {shoot.name}
                  </Text>
                  <Text className="text-gray-100 text-[18px] tracking-widest uppercase mb-1 font-mono">
                    {shoot.file_count} Files
                  </Text>
                  <Text className="text-[#c69c6d] text-[18px] tracking-widest uppercase font-mono">
                    Total Size {formatBytes(shoot.total_size)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/** Bottom Navigation Bar */}
      <View className="w-full bg-[#111111] border-t border-gray-800 flex-row justify-between items-center px-6 pb-6 pt-4 h-24 absolute bottom-0 z-50">
        <TouchableOpacity className="flex-1 items-center">
          <View className="bg[#c69c6d] h-[2px] w-12 absolute -top-4" />
          <Text className="text-[#c69c6d] text-[18px] font-mono tracking-widest uppercase mt-2">
            Archive
          </Text>
        </TouchableOpacity>

        <View className="flex-1 items-center z-50">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="w-14 h-14 bg-[#1A1A1A] border border-gray-700 items-center justify-center shadow-lg absolute -top-20"
            activeOpacity={0.7}
          >
            {/** Add button */}
            <Feather name="plus" color="#c69c6d" size={30} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-gray-200 text-[18px] font-mono mt-2 tracking-widest uppercase">
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
