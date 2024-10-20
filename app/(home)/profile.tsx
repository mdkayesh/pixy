import BottomDrawerSheet from "@/components/BottomSheet";
import LogoutOption from "@/components/LogoutOption";
import ThemeOptions from "@/components/ThemeOptions";
import LogoutBtn from "@/components/buttons/LogoutBtn";
import ToggleThemeBtn from "@/components/buttons/ToggleThemeBtn";
import { Colors } from "@/constants/Colors";
import { auth, db } from "@/firebase/firebase";
import { UserData } from "@/types";
import { Entypo, Octicons } from "@expo/vector-icons";
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  const { colorScheme } = useColorScheme();
  const sheetRef = useRef<bottomSheet>(null);
  const logOutRef = useRef<bottomSheet>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;

  const openBottomSheet = () => {
    sheetRef.current?.expand();
  };

  useEffect(() => {
    if (!currentUser?.uid) return;
    const fetchingData = async () => {
      setLoading(true);
      try {
        const data = (
          await getDoc(doc(db, "users", currentUser?.uid))
        ).data() as unknown as UserData;
        setUserData(data);
      } catch (error) {
        console.log("profile error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();

    return () => {};
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background px-4">
      <ScrollView>
        <View className="items-center py-10">
          <Image
            source={
              currentUser?.photoURL
                ? {
                    uri: currentUser?.photoURL,
                  }
                : require("@/assets/images/avatar.png")
            }
            className="rounded-full w-32 h-32"
          />
          {!loading ? (
            <Text className="text-foreground dark:text-dark-foreground text-3xl font-semibold mt-4 text-center capitalize">
              {currentUser?.displayName || userData?.name || "Unknown user"}
            </Text>
          ) : (
            <View className="mx-auto h-8 w-32 rounded-full bg-secondary dark:bg-dark-secondary mt-4"></View>
          )}
          <Text className="text-mutedForeground dark:text-dark-mutedForeground mt-1 text-center">
            {currentUser?.email}
          </Text>
          {/* <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            icon={
              <AntDesign
                name="edit"
                size={16}
                color={Colors[colorScheme].foreground}
              />
            }
          >
            Edit
          </Button> */}
        </View>

        <View>
          <ToggleThemeBtn onPress={openBottomSheet} />
          <TouchableOpacity
            className="mt-3"
            onPress={() => router.navigate("/savedImages")}
          >
            <View className="flex-row justify-between items-center bg-secondary dark:bg-dark-secondary border border-input dark:border-dark-input py-4 px-4 rounded-lg shadow-lg">
              <View className="flex-row items-center">
                <Octicons
                  name="bookmark"
                  size={24}
                  color={Colors[colorScheme].foreground}
                />
                <Text className="text-foreground dark:text-dark-foreground text-lg ml-4 capitalize">
                  Saved
                </Text>
              </View>
              <View>
                <Entypo
                  name="chevron-thin-right"
                  size={18}
                  color={Colors[colorScheme].mutedForeground}
                />
              </View>
            </View>
          </TouchableOpacity>
          <LogoutBtn onPress={() => logOutRef.current?.expand()} />
        </View>
      </ScrollView>

      {/* theme bottom sheet */}
      <BottomDrawerSheet sheetRef={logOutRef} points={["30%"]}>
        <LogoutOption />
      </BottomDrawerSheet>
      {/* theme bottom sheet */}
      <BottomDrawerSheet sheetRef={sheetRef} points={["35%"]}>
        <ThemeOptions />
      </BottomDrawerSheet>
    </SafeAreaView>
  );
};

export default profile;
