import BottomDrawerSheet from "@/components/BottomSheet";
import Button from "@/components/Button";
import ImageDownloadOption from "@/components/ImageDownloadOption";
import RelatedImages from "@/components/RelatedImages";
import BookmarkBtn from "@/components/buttons/BookmarkBtn";
import DownloadBtn from "@/components/buttons/DownloadBtn";
import { Colors } from "@/constants/Colors";
import useFetch from "@/hooks/useFetch";
import { PicImage } from "@/types";
import { formatNumber } from "@/utils/helpers";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useRef } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingleImage = () => {
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const { data, loading } = useFetch("/", {
    id: id,
  });
  const sheetRef = useRef<BottomSheet>(null);
  const image = data?.hits?.[0] as PicImage;

  const openSheet = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const downloadImgUrls = [image?.webformatURL, image?.largeImageURL];

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      {loading && !data ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator
            size={"large"}
            color={Colors[colorScheme].primary}
          />
        </View>
      ) : (
        <ScrollView className="px-4">
          <View className="pb-10">
            <View className="w-full rounded-lg overflow-hidden mt-4">
              <Image
                source={{
                  uri: image?.largeImageURL,
                }}
                style={{
                  width: "100%",
                  aspectRatio: image?.webformatWidth / image?.webformatHeight,
                }}
                className="bg-secondary dark:bg-dark-secondary"
              />
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <View className="flex-row items-center gap-2">
                <AntDesign
                  name="eyeo"
                  size={18}
                  color={Colors[colorScheme].mutedForeground}
                />
                <Text className="text-mutedForeground dark:text-dark-mutedForeground uppercase">
                  {formatNumber(image?.views)}{" "}
                  <Text className="capitalize">views</Text>
                </Text>
              </View>

              <DownloadBtn
                downloadNumber={image?.downloads}
                imageUrl={image?.webformatURL}
                onPress={openSheet}
              />
            </View>

            <View className="flex-row items-center justify-between w-full mt-4">
              <Button
                className="min-w-[50px]"
                size="sm"
                variant="outline"
                icon={
                  <AntDesign
                    name="hearto"
                    size={18}
                    color={Colors[colorScheme].mutedForeground}
                  />
                }
              >
                {formatNumber(image?.likes)}
              </Button>

              <View className="flex-row items-center">
                <BookmarkBtn image={image} />
                <Button
                  className="ml-2"
                  size="icon"
                  variant="secondary"
                  icon={
                    <Octicons
                      name="share-android"
                      size={18}
                      color={Colors[colorScheme].mutedForeground}
                    />
                  }
                />
              </View>
            </View>
            <View className="mt-4">
              <View className="flex-row flex-wrap gap-3">
                {image?.tags?.split(",").map((item) => (
                  <Button key={item} variant="secondary" size="sm">
                    {item}
                  </Button>
                ))}
              </View>
            </View>

            {/* related images */}

            <RelatedImages tags={image.tags} />
          </View>
        </ScrollView>
      )}

      {data && image && (
        <BottomDrawerSheet sheetRef={sheetRef} points={["25%"]}>
          <BottomSheetView className="px-4 py-3">
            <View className="bg-secondary dark:bg-dark-secondary rounded-lg overflow-hidden">
              {downloadImgUrls.map((url) => {
                return <ImageDownloadOption key={url} url={url} />;
              })}
            </View>
          </BottomSheetView>
        </BottomDrawerSheet>
      )}
    </SafeAreaView>
  );
};

export default SingleImage;
