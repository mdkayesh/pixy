import { Colors } from "@/constants/Colors";
import { SessionProvider } from "@/providers/ctx";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";

export const unstable_settings = {
  initialRouteName: "(home)",
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  SystemUI.setBackgroundColorAsync(Colors[colorScheme].background);

  return (
    <SessionProvider>
      <RootSiblingParent>
        <GestureHandlerRootView>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack
              screenOptions={{
                statusBarStyle: colorScheme === "dark" ? "light" : "dark",
                statusBarColor: Colors[colorScheme].background,
              }}
            >
              <Stack.Screen
                name="(home)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </ThemeProvider>
        </GestureHandlerRootView>
      </RootSiblingParent>
    </SessionProvider>
  );
}

// const Layout = () => {
//   const { colorScheme } = useColorScheme();
//   const { isLoading, session } = useSession();

//   return (
//     <Stack
//       screenOptions={{
//         statusBarStyle: colorScheme === "dark" ? "light" : "dark",
//         statusBarColor: colorScheme === "dark" ? "#0b0812" : "#f1edf7",
//       }}
//     >
//       <Stack.Screen
//         name="(home)"
//         options={{
//           headerShown: !isLoading,
//         }}
//       />
//       <Stack.Screen
//         name="(auth)"
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack>
//   );
// };
