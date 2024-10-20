import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import Button from "./Button";
import { useSession } from "@/providers/ctx";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

const LogoutOption = () => {
  const { logOut } = useSession();
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOut();
      router.replace("/landing");
    } catch (error: any) {
      Alert.alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheetView
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text className="text-center text-2xl font-semibold text-foreground dark:text-dark-foreground">
        Are you sure to Log out?
      </Text>
      <Button className="mx-auto mt-4" size="sm" onPress={handleLogout}>
        {loading ? (
          <ActivityIndicator
            size={"small"}
            color={Colors[colorScheme].primaryForeground}
          />
        ) : (
          "Ok"
        )}
      </Button>
    </BottomSheetView>
  );
};

export default LogoutOption;
