import CountrySelect from "@/components/CountrySelect";
import GradientBackground from "@/components/GradientBackground";
import SideBar from "@/components/SideBar";
import {useI18nStore} from "@/stores/i18nStore";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {ArrowRight, Film, Music4} from "@tamagui/lucide-icons";
import React from "react";
import {TouchableWithoutFeedback} from "react-native";

import {Button, Image, Text, View, XStack, YStack} from "tamagui";

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

      <View
        borderTopEndRadius={25}
        borderTopStartRadius={25}
        backgroundColor={"rgba(255,255,255,.1)"}
        height={50}
        justifyContent="center"
        alignItems="center">
        <Text color="white">Banner</Text>
      </View>
    </YStack>
  );
};

export default DefaultLayout;
