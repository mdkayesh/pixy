import { Colors } from "@/constants/Colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler } from "react-native";

type BottomDrawerSheetProps = {
  points: string[];
  sheetRef: React.RefObject<BottomSheetMethods>;
} & BottomSheetProps;

const BottomDrawerSheet = ({
  points,
  sheetRef,
  ...rest
}: BottomDrawerSheetProps) => {
  const { colorScheme } = useColorScheme();
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const backAction = () => {
      if (index >= 0) {
        sheetRef?.current?.close();
        return true; // Prevent the default back action
      }
      return false; // Allow the default back action
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [index]);

  const handleSheetChanges = useCallback((index: number) => {
    setIndex(index);
  }, []);

  const snapPoints = useMemo(() => points, []);
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      handleIndicatorStyle={{
        width: 50,
        backgroundColor: Colors[colorScheme].mutedForeground,
      }}
      backgroundStyle={{
        backgroundColor: Colors[colorScheme].secondary,
      }}
      ref={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      enablePanDownToClose
      {...rest}
    />
  );
};

export default BottomDrawerSheet;
