import { ThemedView } from "@/components/theme";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/providers/ctx";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "nativewind";
import HeaderLeft from "@/components/HeaderLeft";
import HeaderRight from "@/components/HeaderRight";
import React from "react";
import { ActivityIndicator } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const HomeLayout = () => {
  const { isLoading, session } = useSession();
  const { colorScheme } = useColorScheme();

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={Colors[colorScheme].primary} />
      </ThemedView>
    );
  }

  if (!session) {
    SplashScreen.hideAsync()
      .then(() => console.log("splash is hidden"))
      .catch((error) => console.log(error));
    return <Redirect href="/landing" />;
  }

  SplashScreen.hideAsync()
    .then(() => console.log("splash is hidden"))
    .catch((error) => console.log(error));

  return (
    <Stack
      screenOptions={{
        animation: "ios",
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: Colors[colorScheme].background,
          },
          headerLeft: () => <HeaderLeft />,
          headerTitle: "",
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="image/[id]"
        options={{
          headerTitle: "Image",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="savedImages"
        options={{
          headerTitleAlign: "center",
          headerTitle: "Saved",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
