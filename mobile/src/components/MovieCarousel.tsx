import {IFetchResponse, IMovie, TMovieQuery} from "@/interfaces/IFetch";
import {getMovies} from "@/services/list.querys";
import {useI18nStore} from "@/stores/i18nStore";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import {View} from "tamagui";
import CarouselItem from "./CarouselItem";
import {NavigationProp} from "@react-navigation/native";

const lang = {
  es: "esp",
  en: "eng",
};

const MovieCarousel = ({navigation}: {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const {data, isLoading} = useQuery<IFetchResponse<IMovie>>({
    queryKey: ["carousel-movies", locale],
    meta: {lang: lang[locale], limit: 5, page: 1} as TMovieQuery,
    queryFn: getMovies,
  });

  return (
    <View marginBottom={10}>
      <Carousel
        style={{zIndex: -1, position: "relative"}}
        width={800}
        loop={true}
        height={200}
        autoPlayInterval={5000}
        snapEnabled
        autoPlay
        data={data?.results || []}
        onConfigurePanGesture={(g: {enabled: (arg0: boolean) => any}) => {
          "worklet";
          g.enabled(false);
        }}
        renderItem={({item}) => (
          <CarouselItem navigation={navigation} key={item.id} {...item} />
        )}
      />
    </View>
  );
};

export default MovieCarousel;
