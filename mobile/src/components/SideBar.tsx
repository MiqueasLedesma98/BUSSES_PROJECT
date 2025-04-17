import {TouchableWithoutFeedback} from "react-native";
import React, {useMemo} from "react";
import {useI18nStore} from "@/stores/i18nStore";
import {Button, Image, Spinner, Text, View, YStack} from "tamagui";
import {ArrowRight, Film, Music4} from "@tamagui/lucide-icons";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import CountrySelect from "./CountrySelect";
import {ParamListBase, RouteProp, useRoute} from "@react-navigation/native";
import {IPromotion} from "@/interfaces/IFetch";
import {useQuery} from "@tanstack/react-query";
import {getPromotion, TPromotionMeta} from "@/services/list.querys";
import {baseUrl} from "@/axios.config";

const lang = {
  es: "esp",
  en: "eng",
};

type TSidebar = {
  navigation: NativeStackNavigationProp<any>;
};

const isBold = (route: RouteProp<ParamListBase>, name: string): string =>
  route.name === name ? "800" : "100";

const SideBar = ({navigation}: TSidebar) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const {data, isLoading} = useQuery<IPromotion>({
    queryKey: ["left-banner", lang[locale]],
    meta: {
      lang: lang[locale],
      limit: 0,
      page: 1,
      type: "banner",
      type_banner: "left_bar",
    } as TPromotionMeta,
    queryFn: getPromotion,
  });

  const imgPath = useMemo(() => {
    if (data) return baseUrl + data?.path;
    else return undefined;
  }, [data, isLoading]);

  const route = useRoute();

  return (
    <YStack alignItems="center" gap={10} width={200}>
      <TouchableWithoutFeedback onPress={() => navigation.replace("Home")}>
        <Image
          width={150}
          resizeMode="contain"
          source={require("../assets/veotrans-logo.png")}
        />
      </TouchableWithoutFeedback>
      <Button
        color={"white"}
        fontSize={"$6"}
        icon={Film}
        iconAfter={ArrowRight}
        fontWeight={isBold(route, "Movie")}
        width={180}
        backgroundColor={"rgba(255,255,255, 0)"}
        onPress={() => navigation.navigate("Movie")}>
        {t("home.movie-btn", {locale})}
      </Button>
      <Button
        color={"white"}
        fontSize={"$6"}
        icon={Music4}
        iconAfter={ArrowRight}
        fontWeight={isBold(route, "Music")}
        width={180}
        backgroundColor={"rgba(255,255,255, 0)"}
        onPress={() => navigation.navigate("Music")}>
        {t("home.music-btn", {locale})}
      </Button>

      {isLoading ? (
        <Spinner />
      ) : (
        <Image
          backgroundColor={"rgba(255,255,255, 0.2)"}
          source={{uri: imgPath}}
          resizeMode="stretch"
          height={250}
          width={180}
          borderRadius={25}
        />
      )}

      <CountrySelect />
    </YStack>
  );
};

export default SideBar;
