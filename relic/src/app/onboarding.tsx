import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function OnboardingScreen() {
  return (
    <ImageBackground
      source={require("../../assets/onboarding.png")}
      className="flex-1 bg-neutral-950"
    >
      <SafeAreaView className="flex-1 justify-between px-6 pb-8 pt-4">
        {/** Skip button */}
        <View className="flex-row justify-end">
          <TouchableOpacity>
            <Text className="text-gray-400 text-xl tracking-widest font-mono font-bold uppercase">
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <View className="items-center px-2">
          <View className="mb-8">
            <Feather name="folder" size={128} color="#c69c6d" strokeWidth={1} />
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
              onPress={() => router.push("/(authenticated)/viewer")}
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
