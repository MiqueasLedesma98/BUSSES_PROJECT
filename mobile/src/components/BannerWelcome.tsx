import {baseUrl} from "@/axios.config";
import {IPromotion} from "@/interfaces/IFetch";
import {getPromotion, TPromotionMeta} from "@/services/list.querys";
import {useI18nStore} from "@/stores/i18nStore";
import {useModalStore} from "@/stores/modalStore";
import {useQuery} from "@tanstack/react-query";
import React, {useMemo} from "react";
import {Dimensions, TouchableWithoutFeedback} from "react-native";
import {Image} from "tamagui";

const {height, width} = Dimensions.get("screen");

const lang = {
  es: "esp",
  en: "eng",
};

const BannerWelcome = () => {
  const locale = useI18nStore(s => s.locale) ?? "es";
  const openModal = useModalStore(s => s.openModal);

  const {data, isLoading} = useQuery<IPromotion>({
    queryKey: ["welcome", lang[locale]],
    meta: {
      lang: lang[locale],
      type: "banner",
      type_banner: "welcome_banner",
    } as TPromotionMeta,
    queryFn: getPromotion,
  });

  const imgPath = useMemo(() => {
    if (data) return baseUrl + data.path;
    else return undefined;
  }, [data, isLoading]);

  return (
    <TouchableWithoutFeedback
      onPress={() => openModal("promotion-detail", data as IPromotion)}>
      <Image
        alignSelf="center"
        source={{uri: imgPath}}
        resizeMode="stretch"
        height={height * 0.5}
        width={width * 0.96}
        margin={15}
        borderRadius={25}
        backgroundColor={"rgba(255,255,255, .5)"}
        justifyContent="center"
        alignItems="center"
      />
    </TouchableWithoutFeedback>
  );
};

export default BannerWelcome;
