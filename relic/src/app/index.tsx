import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Host, Checkbox } from "@expo/ui";
import { Link, router } from "expo-router";
import { cssInterop } from "nativewind";

export default function LoginScreen() {
  cssInterop(Link, { className: "style" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ImageBackground
      className="flex-1 max-h-screen overflow-hidden"
      source={require("../../assets/screen.png")}
    >
      <SafeAreaView className="flex-1 justify-between">
        {/** Top Section */}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
        >
          <View className="items-center rounded-t-[40px] bg-[#F5F4F0] px-[30px] pb-[50px] pt-[40px]">
            <View className="flex flex-column gap-1 items-center justify-center">
              <Text className="text-6xl font-bold">Relic.</Text>
              <View className="flex flex-column gap-1 items-center justify-center">
                <Text className="text-black text-3xl tracking-wide text-semibold">
                  Welcome back.
                </Text>
                <Text className="text-[#666] text-sm">
                  Your private archive awaits
                </Text>
              </View>
            </View>

            <View className="w-full flex flex-column items-start gap-3 mt-10">
              <Text className="w-full text-left font-semibold">
                Email or Phone no.
              </Text>
              <TextInput
                className="w-full text-[#ddd] border-b-[#ddd] border-b-2 py-3 "
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter your email"
              />
            </View>

            <View className="w-full flex flex-column items-start justify-center mt-10 mb-5 gap-3">
              <Text className="w-full">Password</Text>
              <View className="w-full flex-row relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="***********"
                  className="w-full text-[#ddd] border-b-[#ddd] border-b-2 py-3 font-semibold"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="mt-5 absolute top-[-10] right-0"
                >
                  <Text className="text-[#c69c6d] font-medium">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row items-center w-full justify-between">
              {/**<Host matchContents>
                <Checkbox 
                  label='Remember me'
                  value={isChecked}
                  onValueChange={setIsChecked}
                  className='h-10'
                />
              </Host> */}
              <Text className="text-gray-500">Forgot password?</Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(authenticated)/dashboard")}
              className="bg-[#c69c6d] w-full flex justfy-center items-center py-5 rounded-xl mt-10 mb-5"
            >
              <Text className="text-white text-2xl font-semibold">Login</Text>
            </TouchableOpacity>

            <View>
              <Text>
                Don't have an account?{" "}
                <Text
                  onPress={() => router.push("/onboarding")}
                  className="text-[#c69c6d] font-semibold text-lg"
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
