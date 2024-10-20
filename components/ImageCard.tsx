import { PicImage } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";

type ImageCardProps = {
  columns: number;
  index: number;
} & PicImage;

const ImageCard = (props: ImageCardProps) => {
  const {
    id,
    index,
    columns,
    imageURL,
    previewURL,
    previewWidth,
    previewHeight,
    webformatURL,
  } = props;

  // const screenWidth = Dimensions.get("window").width / 2;

  const calculateAspectRatio = (width: number, height: number) => {
    return width / height;
  };
  const aspectRatio = calculateAspectRatio(previewWidth, previewHeight);
  const isLastImage = (index + 1) % columns === 0;

  return (
    <Pressable
      className="overflow-hidden bg-accent dark:bg-dark-accent rounded-lg mb-3"
      style={{
        marginRight: isLastImage ? 0 : 12,
      }}
      onPress={() => router.push(`/image/${id}`)}
    >
      <Image
        source={{
          uri: webformatURL || imageURL || previewURL,
        }}
        style={{
          aspectRatio: aspectRatio,
        }}
      />
    </Pressable>
  );
};

export default ImageCard;
