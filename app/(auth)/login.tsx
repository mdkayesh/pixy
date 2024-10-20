import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemedText, ThemedView } from "@/components/theme";
import { useSession } from "@/providers/ctx";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Login = () => {
  const { colorScheme } = useColorScheme();
  const { signIn } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && password) {
      if (emailRegex.test(email)) {
        setIsLoading(true);
        try {
          await signIn(email, password);
          router.replace("/");
        } catch (error: any) {
          setError(error?.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("Please enter valid email!");
      }
    } else {
      setError("Please fill all the fields");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1">
        <ThemedView className="w-full h-full px-4">
          <TouchableOpacity className="mt-6 w-10" onPress={router.back}>
            <AntDesign
              name="arrowleft"
              size={24}
              color={Colors[colorScheme].foreground}
            />
          </TouchableOpacity>
          <ScrollView className="flex-1">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View className="flex-1 justify-between h-[90vh]">
                <View className="mt-5">
                  <Image
                    source={require("@/assets/images/logo.png")}
                    width={160}
                    height={100}
                    resizeMode="contain"
                    className="w-40 h-20"
                  />
                  <ThemedText className="text-2xl font-semibold mt-2">
                    Login with your account
                  </ThemedText>
                </View>

                <View className="space-y-5 mt-6">
                  <Input
                    placeholder="Enter your email"
                    inputMode="email"
                    value={email}
                    className="bg-popover dark:bg-dark-secondary"
                    onChangeText={setEmail}
                  />
                  <View className="relative">
                    <Input
                      placeholder="Enter your password"
                      inputMode="text"
                      secureTextEntry={!showPass}
                      value={password}
                      className="bg-popover dark:bg-dark-secondary"
                      onChangeText={setPassword}
                    />
                    <Pressable
                      className="absolute top-1/2 right-4 -translate-y-2.5"
                      onPress={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <FontAwesome name="eye" size={20} color="gray" />
                      ) : (
                        <FontAwesome name="eye-slash" size={20} color="gray" />
                      )}
                    </Pressable>
                  </View>
                  {error && <Text className="text-red-600">{error}</Text>}

                  <Button
                    size="lg"
                    onPress={handleSubmit}
                    className="items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size={"small"} color={"white"} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </View>
                <View className="items-center pt-10 pb-5">
                  <ThemedText>
                    Don't have account?{" "}
                    <Link href={"/signup"} className="text-primary">
                      Sign up
                    </Link>
                  </ThemedText>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ThemedView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
