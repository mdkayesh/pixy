import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import React from "react";
import { TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  extraClass?: string;
};

const Input = ({ extraClass, ...rest }: InputProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <TextInput
      className="px-4 py-3 border-[1px]
       border-input dark:border-dark-input rounded-lg w-full text-foreground dark:text-dark-foreground focus:border-ring"
      placeholderTextColor={Colors[colorScheme].mutedForeground}
      cursorColor={Colors[colorScheme].primary}
      {...rest}
    />
  );
};

export default Input;
