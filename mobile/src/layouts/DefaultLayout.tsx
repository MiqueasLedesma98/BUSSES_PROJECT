import CountrySelect from "@/components/CountrySelect";
import GradientBackground from "@/components/GradientBackground";
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
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  return (
    <XStack flex={1}>
      <YStack
        alignItems="center"
        gap={10}
        width={200}
        backgroundColor={"rgba(0,0,0,.15)"}>
        <TouchableWithoutFeedback onPress={() => navigation.replace("Home")}>
          <Image
            width={150}
            resizeMode="contain"
            source={require("../assets/veotrans-logo.png")}
          />
        </TouchableWithoutFeedback>
        <Button
          icon={Film}
          iconAfter={ArrowRight}
          width={180}
          backgroundColor={"rgba(255,255,255,.5)"}
          onPress={() => navigation.navigate("Movie")}>
          {t("home.movie-btn", {locale})}
        </Button>
        <Button
          icon={Music4}
          iconAfter={ArrowRight}
          width={180}
          backgroundColor={"rgba(255,255,255,.5)"}
          onPress={() => navigation.navigate("Music")}>
          {t("home.music-btn", {locale})}
        </Button>
        <View
          backgroundColor={"rgba(255,255,255,.5)"}
          height={250}
          width={180}
          justifyContent="center"
          alignItems="center"
          borderRadius={"$6"}>
          <Text>Banner Left</Text>
        </View>
        <CountrySelect />
      </YStack>
      {children}
      <GradientBackground />
    </XStack>
  );
};

export default DefaultLayout;
