import { Text, TextProps, View } from "react-native";

export const ThemedText = ({ ...rest }: TextProps) => {
  return (
    <Text className="text-foreground dark:text-dark-foreground" {...rest} />
  );
};

export const ThemedView = ({ ...rest }: TextProps) => {
  return <View className="bg-background dark:bg-dark-background" {...rest} />;
};
