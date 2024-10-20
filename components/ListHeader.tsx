import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Button from "./Button";

const categories = [
  "All",
  "backgrounds",
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "religion",
  "places",
  "animals",
  "industry",
  "computer",
  "food",
  "sports",
  "transportation",
  "travel",
  "buildings",
  "business",
  "music",
];

type ListHeaderProps = {
  onPress: () => void;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const ListHeader = ({
  onPress,
  selectedCategory,
  setSelectedCategory,
}: ListHeaderProps) => {
  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
    onPress();
  };

  const renderCategoryItem = ({ item }: { item: string }) => {
    return (
      <Button
        variant={item === selectedCategory ? "primary" : "secondary"}
        size="sm"
        className="min-w-[60px]"
        onPress={() => handleCategoryPress(item)}
      >
        <Text>{item}</Text>
      </Button>
    );
  };
  return (
    <View className="pb-5">
      <FlatList
        contentContainerStyle={{
          gap: 12,
        }}
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ListHeader;
