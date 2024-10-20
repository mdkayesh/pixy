import { Colors } from "@/constants/Colors";
import { getImageDetails } from "@/utils/helpers";
import { TouchableOpacity, useBottomSheet } from "@gorhom/bottom-sheet";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-root-toast";
import { ThemedText } from "./theme";
import { AntDesign } from "@expo/vector-icons";

const ImageDownloadOption = ({ url }: { url: string }) => {
  const { colorScheme } = useColorScheme();
  const { close } = useBottomSheet();
  const [details, setDetails] = useState({
    size: "",
    width: 0,
    height: 0,
  });
  const [loading, setLoading] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function downloadImage(url: string) {
    setLoading(true);
    try {
      // Check for Media Library permissions
      await requestPermission();

      if (permissionResponse?.status !== "granted") {
        Toast.show("Permission to access media library is required!", {
          backgroundColor: Colors[colorScheme].destructive,
          textColor: Colors[colorScheme].destructiveForeground,
          position: Toast.positions.TOP,
          animation: true,
          opacity: 1,
        });
        return;
      }

      // Create a unique local URI for the image
      const localUri = `${FileSystem.documentDirectory}${url.split("/").pop()}`;

      // Download the image
      const downloadResult = await FileSystem.downloadAsync(url, localUri);

      // Save the image to the media library
      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      await MediaLibrary.createAlbumAsync("Downloaded Images", asset, false);

      Toast.show("Image is donwloaded", {
        backgroundColor: Colors[colorScheme].primary,
        textColor: Colors[colorScheme].primaryForeground,
        position: Toast.positions.TOP,
        animation: true,
        opacity: 1,
      });
      close();
    } catch (error) {
      console.error(error);
      Toast.show("Error for downloading Image", {
        backgroundColor: Colors[colorScheme].destructive,
        textColor: Colors[colorScheme].destructiveForeground,
        position: Toast.positions.CENTER,
        animation: true,
        opacity: 1,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const d = await getImageDetails(url);
      setDetails(d);
      setLoading(false);
    })();
  }, [url]);

  return (
    <>
      <TouchableOpacity onPress={() => downloadImage(url)} disabled={loading}>
        <View
          className={`${
            loading ? "justify-center" : "justify-between"
          } flex-row items-center px-4 py-4`}
        >
          {loading ? (
            <ActivityIndicator
              size={"small"}
              color={Colors[colorScheme].foreground}
            />
          ) : (
            <>
              <View className="flex-row items-center flex-1 max-w-[120px]">
                <AntDesign
                  name="download"
                  size={18}
                  color={Colors[colorScheme].primaryForeground}
                  style={{ marginRight: 8 }}
                />
                <ThemedText>{`${details.width} * ${details.height}`}</ThemedText>
              </View>
              <ThemedText>jpg</ThemedText>
              <ThemedText>{details.size}</ThemedText>
            </>
          )}
        </View>
      </TouchableOpacity>
      <View className="h-[1px] w-4/5 bg-input dark:bg-dark-input mx-auto" />
    </>
  );
};

export default ImageDownloadOption;
