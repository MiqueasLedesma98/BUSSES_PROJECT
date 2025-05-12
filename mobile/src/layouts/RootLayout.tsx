import GradientBackground from "@/components/GradientBackground";
import NavOptions from "@/components/NavOptions";
import {NavigationProp} from "@react-navigation/native";
import React from "react";
import {Image, View, XStack} from "tamagui";

interface RootLayoutProps {
  children: React.ReactNode;
  navigation: NavigationProp<any>;
}

const RootLayout: React.FC<RootLayoutProps> = ({children, navigation}) => {
  return (
    <View flex={1}>
      <XStack padding={15} width={"100%"} justifyContent="space-between">
        <Image
          source={require("../assets/veotrans-logo.png")}
          resizeMethod="resize"
        />
        <NavOptions navigation={navigation} />
      </XStack>
      {children}
      <GradientBackground />
    </View>
  );
};

export default RootLayout;
