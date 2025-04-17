import BannerBottom from "@/components/BannerBottom";
import GradientBackground from "@/components/GradientBackground";
import SideBar from "@/components/SideBar";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import React from "react";

import {XStack, YStack} from "tamagui";

interface DefaultLayoutProps {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<any>;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  navigation,
}) => {
  return (
    <YStack flex={1}>
      <GradientBackground />

      <XStack flex={1}>
        <SideBar navigation={navigation} />

        {children}
      </XStack>

      <BannerBottom height={60} />
    </YStack>
  );
};

export default DefaultLayout;
