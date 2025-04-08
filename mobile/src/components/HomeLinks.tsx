import {useWindowDimensions} from "react-native";
import React from "react";
import {Button, XStack} from "tamagui";
import {ArrowRight, Film, Music4} from "@tamagui/lucide-icons";
import type {NavigationProp} from "@react-navigation/native";
import {useI18nStore} from "@/stores/i18nStore";

interface HomeLinksProps {
  navigation: NavigationProp<any>;
}

const HomeLinks = ({navigation}: HomeLinksProps) => {
  const {width} = useWindowDimensions();
  const t = useI18nStore(s => s.t);

  return (
    <XStack
      justifyContent={"space-between"}
      alignItems="center"
      maxWidth="100%">
      <Button
        onPress={() => navigation.navigate("Movie")}
        margin={12.5}
        color={"white"}
        backgroundColor={"rgba(255,255,255, .5)"}
        width={width * 0.5 - 25}
        size={100}
        icon={Film}
        iconAfter={ArrowRight}>
        {t("home.movie-btn")}
      </Button>
      <Button
        onPress={() => navigation.navigate("Music")}
        margin={12.5}
        color={"white"}
        backgroundColor={"rgba(255,255,255, .5)"}
        width={width * 0.5 - 25}
        size={100}
        icon={Music4}
        iconAfter={ArrowRight}>
        {t("home.music-btn")}
      </Button>
    </XStack>
  );
};

export default HomeLinks;
