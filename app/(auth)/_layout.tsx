import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthLayout;
