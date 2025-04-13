import {useI18nStore} from "@/stores/i18nStore";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import {Button, View} from "tamagui";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

const MovieCarousel = () => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  return (
    <View marginBottom={10}>
      <Carousel
        style={{zIndex: -1, position: "relative"}}
        width={800}
        loop={true}
        height={200}
        snapEnabled
        data={defaultDataWith6Colors}
        onConfigurePanGesture={(g: {enabled: (arg0: boolean) => any}) => {
          "worklet";
          g.enabled(false);
        }}
        renderItem={({item, index}) => (
          <View key={index} backgroundColor={item} height={200} width={"100%"}>
            <Button
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
        )}
      />
    </View>
  );
};

export default MovieCarousel;
