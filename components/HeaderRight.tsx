import { auth } from "@/firebase/firebase";
import { Link } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

const HeaderRight = () => {
  const currentUser = auth.currentUser;
  return (
    <Link href={"/profile"}>
      <View>
        <Image
          source={
            currentUser?.photoURL
              ? {
                  uri: currentUser?.photoURL,
                }
              : require("@/assets/images/avatar.png")
          }
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />
      </View>
    </Link>
  );
};

export default HeaderRight;
