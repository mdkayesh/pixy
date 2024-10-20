import { View, Text } from "react-native";
import React from "react";
import { BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const ThemeOptions = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <BottomSheetView
      style={{
        flex: 1,
        padding: 12,
      }}
    >
      <TouchableOpacity onPress={() => setColorScheme("dark")}>
        <View className="flex-row justify-between items-center border border-input dark:border-dark-input py-4 px-4 rounded-lg shadow-lg">
          <View className="flex-row items-center">
            <FontAwesome
              name="moon-o"
              size={24}
              color={Colors[colorScheme].foreground}
            />
            <Text className="text-foreground dark:text-dark-foreground text-lg ml-4">
              Dark
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={
                colorScheme === "dark"
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
              size={24}
              color={
                colorScheme === "dark"
                  ? Colors[colorScheme].primary
                  : Colors[colorScheme].mutedForeground
              }
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setColorScheme("light")}>
        <View className="flex-row justify-between items-center border border-input dark:border-dark-input py-4 px-4 rounded-lg shadow-lg">
          <View className="flex-row items-center">
            <Entypo
              name="light-up"
              size={24}
              color={Colors[colorScheme].foreground}
            />
            <Text className="text-foreground dark:text-dark-foreground text-lg ml-4">
              Light
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={
                colorScheme === "light"
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
              size={24}
              color={
                colorScheme === "light"
                  ? Colors[colorScheme].primary
                  : Colors[colorScheme].mutedForeground
              }
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setColorScheme("system")}>
        <View className="flex-row justify-between items-center border border-input dark:border-dark-input py-4 px-4 rounded-lg shadow-lg">
          <View className="flex-row items-center">
            <Feather
              name="monitor"
              size={24}
              color={Colors[colorScheme]?.foreground}
            />
            <Text className="text-foreground dark:text-dark-foreground text-lg ml-4">
              System
            </Text>
          </View>
          {/* <View>
                <MaterialIcons
                  name={
                    colorScheme !==
                      ? "radio-button-checked"
                      : "radio-button-unchecked"
                  }
                  size={24}
                  color={
                    colorScheme ===
                      ? Colors[colorScheme].primary
                      : Colors[colorScheme].mutedForeground
                  }
                />
              </View> */}
        </View>
      </TouchableOpacity>
    </BottomSheetView>
  );
};

export default ThemeOptions;
