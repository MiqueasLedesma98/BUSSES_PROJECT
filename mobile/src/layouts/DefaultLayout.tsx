import BannerBottom from "@/components/BannerBottom";
import GradientBackground from "@/components/GradientBackground";
import SideBar from "@/components/SideBar";
import {ParamListBase, RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import React from "react";

import {XStack, YStack} from "tamagui";

interface DefaultLayoutProps {
  route: RouteProp<ParamListBase>;
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
  theme: ReactNavigation.Theme;
  children: React.ReactElement;
}

const DefaultLayout = ({navigation, children}: DefaultLayoutProps) => {
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
