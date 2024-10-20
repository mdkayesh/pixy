import ImageCard from "@/components/ImageCard";
import ListHeader from "@/components/ListHeader";
import SearchBar from "@/components/SearchBar";
import { ThemedText, ThemedView } from "@/components/theme";
import { Colors } from "@/constants/Colors";
import useFetch from "@/hooks/useFetch";
import { PicImage } from "@/types";
import { MasonryFlashList } from "@shopify/flash-list";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const { colorScheme } = useColorScheme();
  const [images, setImages] = useState<PicImage[] | []>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState<boolean | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { data, loading, error, fetchData } = useFetch("/", {
    q: searchQuery.split(" ").join("+"),
    category: selectedCategory === "All" ? undefined : selectedCategory,
    order: "latest",
  });

  useEffect(() => {
    console.log("image data ......");
    if (data?.hits && data?.hits?.length > 0) {
      setImages([...images, ...data?.hits]);
    }

    return () => {};
  }, [data]);

  const onSearch = (text: string) => {
    setSearchQuery(text);
    setImages([]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    console.log("onRefresh.........");
    setImages([]);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (error)
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ThemedText>Something went wrong</ThemedText>
      </ThemedView>
    );

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      <View className="px-4">
        <SearchBar onSearch={onSearch} />
      </View>

      {loading && images.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size={"large"}
            color={Colors[colorScheme].primary}
          />
        </View>
      ) : (
        <MasonryFlashList
          ListEmptyComponent={() => {
            if (loading) return null;
            return (
              <View className="h-[60vh] justify-center items-center">
                <ThemedText>No Image Found!</ThemedText>
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing || false}
            />
          }
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          data={images}
          renderItem={({ item, index }) => (
            <ImageCard {...item} index={index} columns={2} />
          )}
          keyExtractor={(item, index) =>
            item.id.toString() + item.previewURL + index
          }
          numColumns={2}
          estimatedItemSize={400}
          onEndReached={() => {
            if (loading || images.length === 0) return;
            console.log("onEndReached.........");
            fetchData();
          }}
          onEndReachedThreshold={0.9}
          ListHeaderComponent={
            <ListHeader
              onPress={() => setImages([])}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
          ListFooterComponent={() => {
            if (!loading) return null;

            return (
              <View className="justify-center items-center py-3">
                <ActivityIndicator
                  size={"large"}
                  color={Colors[colorScheme].primary}
                />
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default index;
