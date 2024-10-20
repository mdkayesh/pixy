import React, { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";

export type ButtonProps = TouchableOpacityProps & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  url?: string;
  icon?: ReactNode;
};

const Button = ({
  variant = "primary",
  size = "md",
  url,
  children,
  icon,
  ...rest
}: ButtonProps) => {
  const getStyles = (variant: string, size: string) => {
    let containerClasses = "";
    let textClasses = "";

    switch (variant) {
      case "secondary":
        containerClasses = "bg-secondary dark:bg-dark-secondary";
        textClasses =
          "text-secondaryForeground dark:text-dark-secondaryForeground";
        break;
      case "outline":
        containerClasses =
          "bg-transparent border border-input dark:border-dark-input";
        textClasses = "text-foreground dark:text-dark-foreground";
        break;
      case "ghost":
        containerClasses =
          "bg-transparent focus:bg-accent focus:dark:bg-dark-accent";
        textClasses = "text-foreground dark:text-dark-foreground";
        break;
      case "primary":
      default:
        containerClasses = "bg-primary dark:bg-dark-primary";
        textClasses = "text-primaryForeground dark:text-primaryForeground";
        break;
    }

    switch (size) {
      case "sm":
        containerClasses += " py-2 px-4 min-w-[110px]";
        textClasses += " text-sm";
        break;
      case "md":
        containerClasses += " py-2.5 px-6 min-w-[130px]";
        textClasses += " text-base";
        break;
      case "lg":
        containerClasses += " w-full py-3";
        textClasses += " text-base";
        break;
      case "icon":
        containerClasses += " w-10 h-10 flex items-center justify-center";
        textClasses += " text-base";
        break;
      case "default":
      default:
        containerClasses += " py-3 px-4";
        textClasses += " text-base";
        break;
    }

    return {
      containerClasses,
      textClasses,
    };
  };

  const { containerClasses, textClasses } = getStyles(variant, size);

  return (
    <TouchableOpacity
      className={`rounded-lg flex-row justify-center ${containerClasses}`}
      {...rest}
    >
      {url ? (
        <>
          {icon && (
            <View className={children ? "mr-2" : undefined}>{icon}</View>
          )}
          <Link href={url} className={`text-center ${textClasses}`}>
            {children}
          </Link>
        </>
      ) : (
        <>
          {icon && (
            <View className={children ? "mr-2" : undefined}>{icon}</View>
          )}
          {children && (
            <Text className={`text-center ${textClasses}`}>{children}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
