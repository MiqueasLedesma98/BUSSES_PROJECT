import BannerBottom from "@/components/BannerBottom";
import NavOptions from "@/components/NavOptions";
import React from "react";
import {Image, View, XStack} from "tamagui";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
  return (
    <View flex={1} backgroundColor={"darkblue"}>
      <XStack padding={15} width={"100%"} justifyContent="space-between">
        <Image
          source={require("../assets/veotrans-logo.png")}
          resizeMethod="resize"
        />
        <NavOptions />
      </XStack>
      {children}
    </View>
  );
};

export default RootLayout;
