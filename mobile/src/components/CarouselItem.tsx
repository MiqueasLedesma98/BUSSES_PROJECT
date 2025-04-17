import {baseUrl} from "@/axios.config";
import {IMovie} from "@/interfaces/IFetch";
import {useI18nStore} from "@/stores/i18nStore";
import {NavigationProp} from "@react-navigation/native";
import React from "react";
import {Button, Image, View} from "tamagui";

const CarouselItem = (data: IMovie & {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  return (
    <View>
      <Image
        source={{uri: baseUrl + data?.cover_path}}
        resizeMode="stretch"
        height={200}
        width={"100%"}
      />
      <Button
        onPress={() => data?.navigation.navigate("Media-Player", data)}
        fontWeight={"normal"}
        fontSize={18}
        color="white"
        backgroundColor={"#2988C8"}
        zIndex={200}
        position="absolute"
        bottom={10}
        right={10}>
        {t("see", {locale})}
      </Button>
    </View>
  );
};

export default CarouselItem;
