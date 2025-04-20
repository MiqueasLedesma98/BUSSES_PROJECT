import React from "react";
import CardMovie from "@/components/CardMovie";
import {H2, H4, ScrollView, Spinner, View, YStack} from "tamagui";
import MovieCarousel from "@/components/MovieCarousel";
import CategorySelector from "@/components/CategorySelector";
import {useQuery} from "@tanstack/react-query";
import {getMovies} from "@/services/list.querys";
import {IFetchResponse, IMovie, TMovieQuery} from "@/interfaces/IFetch";
import {useI18nStore} from "@/stores/i18nStore";
import MovieDetail from "@/components/MovieDetail";
import {NavigationProp} from "@react-navigation/native";
import {FlatList} from "react-native";

const lang = {
  es: "esp",
  en: "eng",
};

interface IProps {
  navigation: NavigationProp<any>;
}

const MovieScreen = ({navigation}: IProps) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const {data, isLoading, refetch} = useQuery<IFetchResponse<IMovie>>({
    queryKey: ["movies", locale],
    meta: {
      limit: 50,
      page: 1,
      lang: lang[locale],
      type: "movie",
    } as TMovieQuery,
    queryFn: getMovies,
  });

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <MovieCarousel type="movie" navigation={navigation} />
            <CategorySelector type="movie" />
          </>
        }
        refreshing={isLoading}
        onRefresh={refetch}
        contentContainerStyle={{alignItems: "center"}}
        numColumns={3}
        data={data?.results ?? []}
        renderItem={({item}) => <CardMovie {...item} key={item.id} />}
        ListEmptyComponent={
          <H4 color={"white"}>{t("not-found-movies", {locale})}</H4>
        }
      />
      <MovieDetail navigation={navigation} />
    </>
  );
};

export default MovieScreen;
