import { Colors } from "@/constants/Colors";
import { formatNumber } from "@/utils/helpers";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import Button, { ButtonProps } from "../Button";

type DownloadBtnProps = {
  downloadNumber: number;
  imageUrl: string;
} & ButtonProps;

const DownloadBtn = ({
  downloadNumber,
  imageUrl,
  ...rest
}: DownloadBtnProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <Button
      size="sm"
      icon={
        <AntDesign
          name="download"
          size={18}
          color={Colors[colorScheme].primaryForeground}
        />
      }
      {...rest}
    >
      {formatNumber(downloadNumber)}
    </Button>
  );
};

export default DownloadBtn;
