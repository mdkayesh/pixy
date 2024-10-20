import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { auth, db } from "@/firebase/firebase";
import { PicImage } from "@/types";
import { router } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useColorScheme } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BottomDrawerSheet from "@/components/BottomSheet";
import { BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import Toast from "react-native-root-toast";

const savedImages = () => {
  const { colorScheme } = useColorScheme();
  const [data, setData] = useState<PicImage[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [docId, setDocId] = useState<string>();
  const currentUser = auth.currentUser;
  const ref = useRef<BottomSheet>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchingData = async () => {
      try {
        if (!currentUser) return;
        const q = query(
          collection(db, "users", currentUser.uid, "saved_images"),
          orderBy("createdAt", "desc")
        );
        const res = await getDocs(q);
        const data = res.docs.map((doc) => {
          return { ...doc.data(), docId: doc.id };
        }) as PicImage[];

        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchingData();
  }, []);

  const handleDelete = async (docId: string) => {
    setIsLoading(true);
    try {
      if (!currentUser?.uid) return;
      const docRef = doc(db, "users", currentUser.uid, "saved_images", docId);
      await deleteDoc(docRef);
      const deletedDocs = data?.filter((item) => item.docId !== docId);
      setData(deletedDocs ?? null);
    } catch (error) {
      console.log(error);
      Toast.show("Cannot delete image", {
        backgroundColor: Colors[colorScheme].destructive,
        textColor: Colors[colorScheme].destructiveForeground,
        position: Toast.positions.CENTER,
        animation: true,
        opacity: 1,
      });
    } finally {
      setIsLoading(false);
      ref.current?.close();
    }
  };

  const openDelete = () => {
    ref.current?.expand();
  };

  const closeDelete = () => {
    ref.current?.close();
  };

  if (data?.length === 0 && !isLoading) {
    return (
      <SafeAreaView className="bg-background dark:bg-dark-background flex-1 justify-center items-center">
        <Text className="text-2xl font-semibold text-foreground dark:text-dark-foreground text-center">
          No saved image!
        </Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView className="bg-background dark:bg-dark-background flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={Colors[colorScheme].primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-background dark:bg-dark-background flex-1">
      <ScrollView className="px-4">
        {data?.map((image) => {
          const calculateAspectRatio = (width: number, height: number) => {
            return width / height;
          };
          const aspectRatio = calculateAspectRatio(
            image.previewWidth,
            image.previewHeight
          );
          return (
            <View
              className="overflow-hidden relative bg-accent dark:bg-dark-accent rounded-lg mb-3"
              key={image.docId}
            >
              <View className="absolute top-3 right-3 z-10">
                <Button
                  onPress={() => {
                    setDocId(image.docId);
                    openDelete();
                  }}
                  size="icon"
                  icon={
                    isLoading ? (
                      <ActivityIndicator
                        size={"small"}
                        color={Colors[colorScheme].primary}
                      />
                    ) : (
                      <AntDesign
                        name="delete"
                        size={18}
                        color={Colors[colorScheme].primaryForeground}
                      />
                    )
                  }
                />
              </View>
              <Pressable onPress={() => router.navigate(`/image/${image.id}`)}>
                <Image
                  source={{
                    uri:
                      image.webformatURL || image.imageURL || image.previewURL,
                  }}
                  style={{
                    aspectRatio: aspectRatio,
                  }}
                />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      <BottomDrawerSheet sheetRef={ref} points={["25%"]}>
        <BottomSheetView
          style={{
            padding: 16,
            gap: 12,
          }}
        >
          <Button
            className="bg-destructive text-destructiveForeground"
            size="lg"
            onPress={() => docId && handleDelete(docId)}
          >
            Delete
          </Button>
          <Button variant="outline" size="lg" onPress={closeDelete}>
            Cancel
          </Button>
        </BottomSheetView>
      </BottomDrawerSheet>
    </SafeAreaView>
  );
};

export default savedImages;
