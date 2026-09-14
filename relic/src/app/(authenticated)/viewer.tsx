import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function ImageViewerScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={["top"]}>
      {/** navigation section */}
      <View className="flex-row justify-between items-center px-4 py-2 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 border border-gray-800 items-center justify-center"
        >
          <Feather name="arrow-left" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity className="w-10 h-10 border border-gray-800 items-center justify-center rounded-full">
          <Feather name="info" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/** Main section */}
      <View className="flex-1 justify-center items-center px-4">
        <View className="border border-gray-800 p-4 w-full">
          <Image
            source={require("../../../assets/img-preview.png")}
            className="w-full h-72"
            resizeMode="contain"
          />
        </View>
      </View>

      {/** Image Details  */}
      <View className="flex-1 bg-[#1111] border-t border-gray-800 max-h-[50%]">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
          <View>
            <Text className="text-gray-300 font-serif text-sm">
              IMG_2023_YOSEMITE_PEAK.DNG
            </Text>
            <Text className="text-gray-500 text-xs mt-1">
              Captured: 2023-10-14 06:42 AM
            </Text>
          </View>

          <TouchableOpacity className="border border-gray-700 px-4 py-2 flex-row items-center">
            <Feather
              name="rotate-ccw"
              size={12}
              color="#c69c6d"
              style={{ marginRight: 8 }}
            />
            <Text className="text-[#c69c6d] text-xs tracking-widest font-mono font-bold uppercase">
              Restore
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="px-4 pt-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-lg font-serif">Metadata</Text>
            <TouchableOpacity>
              <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/** Identifier section */}
          <Text className="text-gray-500 text-[10px] tracking-widest font-mono uppercase mb-2">
            Identifier
          </Text>
          <View className="border-t border-gray-800 py-3 mb-4">
            <Text className="text-gray-300 text-sm font-serif">
              IMG_2023_YOSEMITE_PEAK.DNG
            </Text>
          </View>

          {/** EXIF data section */}
          <Text className="text-gray-500 text-[10px ] tracking-widest font-mono uppercase mb-2">
            EXIF Data
          </Text>
          <View className="border-t border-gray-800">
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Camera</Text>
              <Text className="text-gray-300 text-xs font-serif">
                Leica M11 Monochrom
              </Text>
            </View>
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Lens</Text>
              <Text className="text-gray-300 text-xs font-serif">
                Summicron-M 35mm f/2 ASPH.
              </Text>
            </View>
            <View className="flex-row justify-between py-3 mb-4">
              <Text className="text-gray-400 text-xs">Settings</Text>
              <Text className="text-gray-300 text-xs">
                ISO 125, f/8, 1/250s
              </Text>
            </View>
          </View>

          {/** Archive metrics section */}
          <Text className="uppercase text-gray-500 text-[10px] tracking-widest font-mono my-2">
            Archive metrics
          </Text>
          <View className="border-t border-gray-800">
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Original size</Text>
              <Text className="text-gray-300 text-xs font-serif">42.0MB</Text>
            </View>
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Archived size</Text>
              <Text className="text-gray-300 text-xs font-serif">33.0MB</Text>
            </View>
            <View className="flex-row justify-between py-3 mb-4">
              <Text className="text-gray-400 text-xs">Storage saved</Text>
              <Text className="text-gray-300 text-xs font-serif">
                9.0MB (21%)
              </Text>
            </View>
          </View>

          {/** Integrity section */}
          <Text className="text-gray-500 text-[10px] tracking-widest font-mono uppercase mb-2 mt-2">
            Integrity (SHA-256)
          </Text>
          <View className="border-t border-gray-800 py-3 mb-10">
            <Text className="text-gray-400 text[10px] font-mono leading-4">
              e3b0c44298fc1c149afbfc8996fb92427ae41e4649b934ca495991b7852b855
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
