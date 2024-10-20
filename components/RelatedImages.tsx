import { MasonryFlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ImageCard from "./ImageCard";
import useFetch from "@/hooks/useFetch";
import { PicImage } from "@/types";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";

const RelatedImages = ({ tags }: { tags: string }) => {
  const { colorScheme } = useColorScheme();
  const { data, loading } = useFetch("/", {
    q: tags.split(",").join("+"),
    // // page: pageNumber,
    // order: "latest",
  });

  const images = (data?.hits as PicImage[]) || [];
  return (
    <View className="mt-6">
      <Text className="mb-6 text-2xl font-semibold text-foreground dark:text-dark-foreground">
        You may also like
      </Text>

      {loading || !data ? (
        <View className="justify-center">
          <ActivityIndicator
            size={"large"}
            color={Colors[colorScheme].primary}
          />
        </View>
      ) : (
        <MasonryFlashList
          data={images}
          renderItem={({ item, index }) => (
            <ImageCard {...item} index={index} columns={2} />
          )}
          keyExtractor={(item, index) =>
            item.id.toString() + item.previewURL + index
          }
          numColumns={2}
          estimatedItemSize={400}
        />
      )}
    </View>
  );
};

export default RelatedImages;
