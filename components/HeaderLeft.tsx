import React from "react";
import { Image, View } from "react-native";

const HeaderLeft = () => {
  return (
    <View>
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-24 h-10"
        resizeMode="contain"
      />
    </View>
  );
};

export default HeaderLeft;
