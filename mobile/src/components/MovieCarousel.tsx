import {IFetchResponse, IMovie, TMovieQuery} from "@/interfaces/IFetch";
import {getMovies} from "@/services/list.querys";
import {useI18nStore} from "@/stores/i18nStore";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import {Text, View} from "tamagui";
import CarouselItem from "./CarouselItem";
import {NavigationProp} from "@react-navigation/native";
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("screen");

const lang = {
  es: "esp",
  en: "eng",
};

const queryKeySelect = {
  movie: "movie-carousel",
  music: "music-carousel",
};

interface IProps {
  navigation: NavigationProp<any>;
  type: "music" | "movie";
}

const MovieCarousel = ({navigation, type}: IProps) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const {data, isLoading} = useQuery<IFetchResponse<IMovie>>({
    queryKey: [queryKeySelect[type ?? "movie"], locale],
    meta: {lang: lang[locale], limit: 5, page: 1, type} as TMovieQuery,
    queryFn: getMovies,
  });

  if (!data?.results?.length && !isLoading) {
    return (
      <View
        width={width * 0.8}
        backgroundColor={"rgba(0,0,0,.5)"}
        marginBottom={10}
        alignItems="center"
        justifyContent="center"
        height={height * 0.45}>
        <Text color="white">{t("not-found", {locale})}</Text>
      </View>
    );
  }

  return (
    <View marginBottom={10}>
      <Carousel
        autoPlay
        autoPlayInterval={5000}
        data={data?.results || []}
        height={height * 0.45}
        loop={true}
        snapEnabled
        style={{zIndex: -1, position: "relative"}}
        width={width * 0.8}
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
