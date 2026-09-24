import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { createShoot, uploadFiles, triggerArchive } from "../services/api";

export default function OnboardingScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newShootName, setNewShootName] = useState("");
  const [uploading, setUploading] = useState(false);

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
      for (let i = 0; i < result.assets.length; i++) {
        const asset = result.assets[i];

        const localUriFetch = await fetch(asset.uri);
        const blob = await localUriFetch.blob();

        formData.append("files", blob, asset.fileName || `image_${i}.jpg`);
      }

      await uploadFiles(shoot.id, formData);

      await triggerArchive(shoot.id);

      setModalVisible(false);
      setNewShootName("");
      router.replace("/(authenticated)/dashboard");
    } catch (error) {
      console.error("Upload failed", error);
      Alert.alert("Error", "Failed to upload archive.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/onboarding.png")}
      className="flex-1 bg-neutral-950"
    >
      <SafeAreaView className="flex-1 justify-between px-6 pb-8 pt-4">
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

        {/** Skip button */}
        <View className="flex-row justify-end">
          <TouchableOpacity
            onPress={() => router.push("/(authenticated)/dashboard")}
          >
            <Text className="text-gray-400 text-xl tracking-widest font-mono font-bold uppercase">
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <View className="items-center px-2">
          <View className="mb-8">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
            >
              <Feather
                name="folder"
                size={128}
                color="#c69c6d"
                strokeWidth={1}
              />
            </TouchableOpacity>
          </View>

          <Text className="text-4xl text-white font-serif text-center mb-6">
            Import your first shoot
          </Text>

          <Text className="text-gray-100 text-center font-mono leading-6 text-x px-2">
            Initialize your archive. Connect your primary drive and begin the
            cataloging sequence for your raw negatives.
          </Text>
        </View>

        {/** Bottom nav */}
        <View className="w-full">
          {/** Divider Line */}
          <View className="h-[1px] bg-gray-700 w-full mb-6" />

          <View className="flex-row items-center justify-between">
            {/** Pagination Dashes */}
            <View className="flex-row gap-2">
              <View className="w-12 h-1 bg-[#c69c6d]" />
              <View className="w-8 h-1 bg-gray-700" />
              <View className="w-8 h-1 bg-gray-700" />
            </View>

            {/** Next button */}
            <TouchableOpacity
              onPress={() => router.push("/(authenticated)/dashboard")}
              className="flex-row-reverse items-center gap-2 border border-gray-600 px-6 py-3"
            >
              <Feather name="arrow-right" size={14} color="white" />
              <Text className="text-white tracking-[3px] font-mono text-uppercase">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
