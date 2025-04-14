import React from "react";
import CardMovie from "@/components/CardMovie";
import {H2, ScrollView, Spinner, YStack} from "tamagui";
import MovieCarousel from "@/components/MovieCarousel";
import CategorySelector from "@/components/CategorySelector";
import {useQuery} from "@tanstack/react-query";
import {getMovies} from "@/services/list.querys";
import {IFetchResponse, IMovie} from "@/interfaces/IFetch";
import {useI18nStore} from "@/stores/i18nStore";
import MovieDetail from "@/components/MovieDetail";
import {NavigationProp} from "@react-navigation/native";

const lang = {
  es: "esp",
  en: "en",
};

const MovieScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const {data, isLoading} = useQuery<IFetchResponse<IMovie>>({
    queryKey: ["movies", locale],
    meta: {limit: 50, page: 1, lang: lang[locale]},
    queryFn: getMovies,
  });

  return (
    <ScrollView>
      <YStack gap={10}>
        <MovieCarousel />
        <CategorySelector />
        <YStack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={15}
          padding={10}>
          {isLoading ? (
            <Spinner size="large" color={"#2988C8"} />
          ) : (
            <>
              {data?.results?.map((item: IMovie) => (
                <CardMovie {...item} key={item.id} />
              ))}

              {!data?.total && (
                <H2 marginVertical={20} color={"white"}>
                  {t("not-found-movies", {locale})}
                </H2>
              )}
            </>
          )}
        </YStack>
      </YStack>
      <MovieDetail navigation={navigation} />
    </ScrollView>
  );
};

export default MovieScreen;
