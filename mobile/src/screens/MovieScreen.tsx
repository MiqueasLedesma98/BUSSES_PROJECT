import React, {useMemo} from "react";
import CardMovie from "@/components/CardMovie";
import {
  H2,
  H4,
  ScrollView,
  Spinner,
  useWindowDimensions,
  View,
  YStack,
} from "tamagui";
import MovieCarousel from "@/components/MovieCarousel";
import CategorySelector from "@/components/CategorySelector";
import {useQuery} from "@tanstack/react-query";
import {getMovies} from "@/services/list.querys";
import {IFetchResponse, IMovie, TMovieQuery} from "@/interfaces/IFetch";
import {useI18nStore} from "@/stores/i18nStore";
import MovieDetail from "@/components/MovieDetail";
import {NavigationProp} from "@react-navigation/native";
import {FlatList} from "react-native";
import {useMovieFilterStore} from "@/stores/MovieFilterStore";
import SearchFilter from "@/components/SearchFilter";

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
  const category = useMovieFilterStore(s => s.filters.category);
  const search = useMovieFilterStore(s => s.filters.search);
  const {width} = useWindowDimensions();

  const {data, isLoading, refetch} = useQuery<IFetchResponse<IMovie>>({
    queryKey: ["movies", locale, category, search],
    meta: {
      limit: 50,
      page: 1,
      lang: lang[locale],
      type: "movie",
      category,
      search,
    } as TMovieQuery,
    queryFn: getMovies,
  });

  const renderHeader = useMemo(
    () => (
      <>
        {search ? (
          <YStack width={width * 0.85} height={search ? "$6" : 0}>
            <SearchFilter />
          </YStack>
        ) : (
          <SearchFilter />
        )}
        {!search && <MovieCarousel type="movie" navigation={navigation} />}
        {!search && <CategorySelector type="movie" />}
      </>
    ),
    [search, category, width],
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={renderHeader}
        refreshing={isLoading}
        onRefresh={refetch}
        contentContainerStyle={{alignItems: "center"}}
        numColumns={3}
        data={data?.results ?? []}
        renderItem={({item}) => <CardMovie {...item} key={item.id} />}
        ListEmptyComponent={
          <H4 marginTop={"$10"} color={"white"}>
            {t("not-found-movies", {locale})}
          </H4>
        }
      />
      <MovieDetail navigation={navigation} />
    </>
  );
};

export default MovieScreen;
