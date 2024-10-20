import Button from "@/components/Button";
import { ThemedText } from "@/components/theme";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const images = [
  {
    key: 1,
    img: {
      uri: "https://img.freepik.com/free-photo/international-day-education-cartoon-style_23-2151007497.jpg?t=st=1720370196~exp=1720373796~hmac=303783ef1b961d3f717c87a25a1dad64eba06de9fd2bedb25a02e0caa4789914&w=360",
    },
  },
  {
    key: 2,
    img: {
      uri: "https://images.unsplash.com/photo-1595123336219-5eedd543bc4a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    key: 3,
    img: {
      uri: "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
];

const Home = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-background dark:bg-dark-background justify-between">
      <View>
        <Image
          source={require("@/assets/images/logo.png")}
          width={120}
          height={40}
          className="w-40 h-20 mx-auto mt-4"
          resizeMode="contain"
        />

        <FlatList
          className="py-10"
          data={images}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View className="rounded-lg overflow-hidden mr-8">
                <ImageBackground
                  source={item.img}
                  resizeMode="cover"
                  className={`w-[250px] h-[300px] border`}
                />
              </View>
            );
          }}
        />
      </View>
      <View className="mb-10">
        <ThemedText className="text-xl text-center font-semibold">
          Stunning royalty-free images
        </ThemedText>
        <Text className="text-mutedForeground dark:text-dark-mutedForeground text-center mt-6">
          Over 4.6 million+ high quality stock images, videos and music shared
          by our talented community.
        </Text>
        <Button
          variant="secondary"
          size="lg"
          onPress={() => router.navigate("/login")}
          className="mt-10"
        >
          Login
        </Button>
        <Button
          size="lg"
          onPress={() => router.navigate("/signup")}
          className="mt-4"
        >
          Join Now
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
