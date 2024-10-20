import { Colors } from "@/constants/Colors";
import { auth, db } from "@/firebase/firebase";
import { PicImage } from "@/types";
import { Octicons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-root-toast";
import Button from "../Button";

type BookmarkBtnProps = {
  image: PicImage;
};

// if request.auth != null && request.auth.uid == userId;

const BookmarkBtn = ({ image }: BookmarkBtnProps) => {
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState(false);
  const currentUser = auth.currentUser;

  const handleSave = async () => {
    try {
      setLoading(true);
      if (!currentUser?.uid) return;

      const q = query(
        collection(db, "users", currentUser?.uid, "saved_images"),
        where("id", "==", image.id)
      );
      const existingDoc = await getDocs(q);

      console.log(existingDoc.empty);

      if (!existingDoc.empty) {
        Toast.show("Image is already saved!", {
          backgroundColor: Colors[colorScheme].primary,
          textColor: Colors[colorScheme].primaryForeground,
          position: Toast.positions.CENTER,
          animation: true,
          opacity: 1,
        });

        return;
      }

      await addDoc(collection(db, "users", currentUser.uid, "saved_images"), {
        ...image,
        createdAt: serverTimestamp(),
      });

      Toast.show("Image is saved!", {
        backgroundColor: Colors[colorScheme].primary,
        textColor: Colors[colorScheme].primaryForeground,
        position: Toast.positions.CENTER,
        animation: true,
        opacity: 1,
      });
    } catch (error) {
      console.log("add saved images error", error);
      Toast.show("Error to save image!", {
        backgroundColor: Colors[colorScheme].destructive,
        textColor: Colors[colorScheme].destructiveForeground,
        position: Toast.positions.CENTER,
        animation: true,
        opacity: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onPress={handleSave}
      size="icon"
      variant="secondary"
      icon={
        loading ? (
          <ActivityIndicator
            color={Colors[colorScheme].primaryForeground}
            size={"small"}
          />
        ) : (
          <Octicons
            name="bookmark"
            size={18}
            color={Colors[colorScheme].mutedForeground}
          />
        )
      }
    />
  );
};

export default BookmarkBtn;
