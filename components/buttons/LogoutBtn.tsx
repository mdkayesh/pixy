import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

const LogoutBtn = ({ ...rest }: TouchableOpacityProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity className="mt-3" {...rest}>
      <View className="flex-row justify-between items-center bg-secondary dark:bg-dark-secondary border border-input dark:border-dark-input py-4 px-4 rounded-lg shadow-lg">
        <View className="flex-row items-center">
          <MaterialIcons
            name="logout"
            size={24}
            color={Colors[colorScheme].destructive}
          />
          <Text className="text-foreground dark:text-dark-foreground text-lg ml-4 capitalize">
            Logout
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutBtn;
