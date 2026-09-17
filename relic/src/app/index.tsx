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
import { Host } from "@expo/ui";
import { Link, router } from "expo-router";
import { cssInterop } from "nativewind";
import { Checkbox } from "expo-checkbox";
import { login, RelicApiError } from "../services/api";

export default function LoginScreen() {
  cssInterop(Link, { className: "style" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Enter both your email and password");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await login(email, password);
      router.replace("/(authenticated)/dashboard");
    } catch (error) {
      if (error instanceof RelicApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to connect to the Backend.");
      }
    } finally {
      setLoading(false);
    }
  };

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
              {/** Checkbox  */}
              <TouchableOpacity className="flex-row gap-3">
                <Checkbox
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? "#C69C6D" : "#9CA3AF"}
                />
                <Text className="text-gray-600 text-sm">Remember me</Text>
              </TouchableOpacity>
              <Text className="text-gray-500">Forgot password?</Text>
            </View>

            {/** Error Message */}
            {errorMessage ? (
              <Text className="text-red-500 w-full text-center mt-4 font-medium">
                {errorMessage}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={handleLogin}
              className={`${loading ? "bg-[#c69c6d]/70" : "bg-[#c69c6d]"} w-full  mt-6 py-4 rounded-xl items-center mb-6`}
            >
              <Text className="text-white text-2xl font-semibold">
                {loading ? "Authenticating..." : "Login"}
              </Text>
            </TouchableOpacity>

            <View>
              <Text>
                Don't have an account?{" "}
                <Text
                  onPress={() => router.push("/signup")}
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
