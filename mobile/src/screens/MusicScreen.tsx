import CardMusic from "@/components/CardMusic";
import CategorySelector from "@/components/CategorySelector";
import MovieCarousel from "@/components/MovieCarousel";
import {IFetchResponse, IMovie, TMovieQuery} from "@/interfaces/IFetch";
import {getMovies} from "@/services/list.querys";
import {useI18nStore} from "@/stores/i18nStore";
import {NavigationProp} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {FlatList} from "react-native";
import {H4} from "tamagui";

const lang = {
  es: "esp",
  en: "eng",
};

const MusicScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const {data, isLoading, refetch} = useQuery<IFetchResponse<IMovie>>({
    queryKey: ["musics", locale],
    queryFn: getMovies,
    meta: {
      lang: lang[locale],
      type: "music",
      limit: 50,
      page: 1,
    } as TMovieQuery,
  });

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            <MovieCarousel type="music" navigation={navigation} />
            <CategorySelector type="music" />
          </>
        }
        contentContainerStyle={{alignItems: "center"}}
        numColumns={2}
        data={data?.results ?? []}
        onRefresh={() => {}}
        refreshing={false}
        renderItem={({item}) => <CardMusic {...item} key={item?.id} />}
        ListEmptyComponent={
          <H4 color={"white"}>{t("not-found-musics", {locale})}</H4>
        }
      />
    </>
  );
};

export default MusicScreen;
