import {baseUrl} from "@/axios.config";
import {IPromotion} from "@/interfaces/IFetch";
import {getPromotion, TPromotionMeta} from "@/services/list.querys";
import {useI18nStore} from "@/stores/i18nStore";
import {useQuery} from "@tanstack/react-query";
import React, {useMemo} from "react";
import {Image, Spinner} from "tamagui";

const lang = {
  es: "esp",
  en: "eng",
};

const BannerBottom = ({height}: {height?: number}) => {
  const locale = useI18nStore(s => s.locale) ?? "es";

  const {data, isLoading} = useQuery<IPromotion>({
    queryKey: ["banner", lang[locale]],
    meta: {
      lang: lang[locale],
      limit: 0,
      page: 1,
      type: "banner",
      type_banner: "bottom_bar",
    } as TPromotionMeta,
    queryFn: getPromotion,
  });

  const imgPath = useMemo(() => {
    if (data) return baseUrl + data.path;
    else return undefined;
  }, [data, isLoading]);

  return !isLoading ? (
    <Image
      source={{uri: imgPath}}
      resizeMode="stretch"
      height={height}
      width={"100%"}
      backgroundColor="rgba(255, 255, 255, 0.5)"
      borderTopLeftRadius={25}
      marginTop={15}
      borderTopRightRadius={25}
    />
  ) : (
    <Spinner size="large" color="gray" />
  );
};

export default BannerBottom;
