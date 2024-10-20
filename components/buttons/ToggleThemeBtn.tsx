import { Colors } from "@/constants/Colors";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacityProps, View } from "react-native";

const ToggleThemeBtn = ({ ...rest }: TouchableOpacityProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row justify-between items-center bg-secondary dark:bg-dark-secondary border border-input dark:border-dark-input py-4 px-4 rounded-lg shadow-lg">
        <View className="flex-row items-center">
          {colorScheme === "light" ? (
            <Entypo
              name="light-up"
              size={24}
              color={Colors[colorScheme].foreground}
            />
          ) : (
            <FontAwesome
              name="moon-o"
              size={24}
              color={Colors[colorScheme].foreground}
            />
          )}
          <Text className="text-foreground dark:text-dark-foreground text-lg ml-4 capitalize">
            {colorScheme}
          </Text>
        </View>
        <View>
          <Entypo
            name="chevron-thin-down"
            size={18}
            color={Colors[colorScheme].mutedForeground}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ToggleThemeBtn;
