import useDebounce from "@/hooks/useDebounce";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import Input from "./Input";

type SearchBarProps = {
  onSearch: (text: string) => void;
};
const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debounce = useDebounce(onSearch, 400);
  const handleChange = (text: string) => {
    setSearchTerm(text);
    debounce(text);
  };

  return (
    <View className="mb-3 mt-3 flex-row items-center border-[1px] border-input dark:border-dark-input rounded-lg bg-popover dark:bg-dark-secondary focus:border-primary">
      <View className="pl-3">
        <Feather name="search" size={24} color="gray" />
      </View>
      <Input
        placeholder="Search image"
        className="bg-transparent dark:bg-transparent border-[0]"
        onChangeText={handleChange}
        value={searchTerm}
      />
    </View>
  );
};

export default SearchBar;
