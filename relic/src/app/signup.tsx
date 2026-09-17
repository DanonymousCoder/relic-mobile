import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Checkbox } from "expo-checkbox";
import { signup, RelicApiError } from "../services/api";

export default function SignupScreen() {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    setValidationError(null);

    if (!email || !password) {
      return setValidationError("Email and Password are required.");
    }

    if (password !== confirmPassword) {
      return setValidationError("Passwords do not match.");
    }

    if (password.length < 8) {
      return setValidationError("Password must be at least 8 characters.");
    }

    if (!isAgreed) {
      return setValidationError(
        "You must acknowledge the terms and conditions.",
      );
    }

    setLoading(true);

    try {
      await signup(email, password);
      router.replace("/onboarding");
    } catch (error) {
      if (error instanceof RelicApiError) {
        setValidationError(error.message);
      } else {
        setValidationError("Failed to connect to Backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/screen.png")}
      className="flex-1 bg-neutral-900"
    >
      <SafeAreaView className="flex-1 justify-between">
        {/** Card container */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end mt-10"
        >
          <View className="bg-[#f5f4f0] rounded-t-[40px] pt-4 px-6 pb-10 max-h-full">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-10"
            >
              <View className="bg-gray-300 w-12 h-1 rounded-full self-center mb-6" />

              <View>
                <Text className="text-6xl font-bold text-center">Relic.</Text>
              </View>

              <View>
                <Text className="text-3xl text-center">Begin your archive</Text>
                <Text className="text-center text-gray-500 mb-8 text-sm">
                  Self Hosted. Private. Yours
                </Text>
              </View>

              {validationError && <Text>{validationError}</Text>}

              {/** Fullname Input  */}

              <View>
                <Text className="text-[10px] tracking-widest text-black mb-2 font-bold uppercase">
                  Fullname
                </Text>
                <TextInput
                  value={fullname}
                  onChangeText={setFullname}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                  className="border-b border-gray-300 pb-2 mb-6 text-base text-gray-800"
                />
              </View>

              {/** Email Input */}
              <View>
                <Text className="text-[10px] tracking-widest text-black mb-2 font-bold uppercase">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="border-b border-gray-300 pb-2 mb-6 text-base text-gray-800"
                />
              </View>

              {/** Password Input */}
              <View className="w-full">
                <Text className="text-[10px] tracking-widest text-black mb-2 font-bold uppercase">
                  Password
                </Text>
                <View className="flex-row relative w-full">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholder="•••••••••••"
                    placeholderTextColor="#9CA3Af"
                    className="w-full border-b border-gray-300 pb-2 mb-6 text-base text-gray-800"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="mt-5 absolute top-[-20] right-0"
                  >
                    <Text className="text-[#c69c6d] font-medium">
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/** Confirm Password Input */}
              <View>
                <Text className="text-[10px] tracking-widest text-black mb-2 font-bold uppercase">
                  Confirm Password
                </Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  placeholder="•••••••••••"
                  placeholderTextColor="#9ca3af"
                  className="border-b border-gray-300 pb-2 mb-6 text-base text-blackß"
                />
              </View>

              {/** Checkbox  */}
              <TouchableOpacity className="flex-row gap-3 mb-5 mt-2">
                <Checkbox
                  value={isAgreed}
                  onValueChange={setIsAgreed}
                  color={isAgreed ? "#C69C6D" : "#9CA3AF"}
                />
                <Text className="text-gray-600 text-sm leading-5 flex-1">
                  I understand this application is self-hosted &
                  cryptographically encrypted.
                </Text>
              </TouchableOpacity>

              {/** Error message */}
              {validationError ? (
                <Text className="text-red-500 w-full text-center mt-4 font-medium">
                  {validationError}
                </Text>
              ) : null}

              {/** Signup button */}
              <TouchableOpacity
                className={`${loading ? "bg-[#c69c6d]/70" : "bg-[#c69c6d]"} w-full  mt-6 py-4 rounded-xl items-center mb-6`}
                onPress={handleCreateAccount}
                disabled={loading}
              >
                <Text className="text-white text-lg font-semibold">
                  {loading ? "Creating Archive..." : "Signup"}
                </Text>
              </TouchableOpacity>

              {/** Footer text */}
              <TouchableOpacity
                className="items-center"
                onPress={() => router.push("/")}
              >
                <Text className="text-gray-500 text-md">
                  Already have an account{" "}
                  <Text className="text-[#c69c6d] font-semibold">Login</Text>
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
