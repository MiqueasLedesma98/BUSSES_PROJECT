import GradientBackground from "@/components/GradientBackground";
import NavOptions from "@/components/NavOptions";
import React from "react";
import {Image, View, XStack} from "tamagui";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
  return (
    <View flex={1}>
      <XStack padding={15} width={"100%"} justifyContent="space-between">
        <Image
          source={require("../assets/veotrans-logo.png")}
          resizeMethod="resize"
        />
        <NavOptions />
      </XStack>
      {children}
      <GradientBackground />
    </View>
  );
};

export default RootLayout;
