import React from "react";
import {Button, H4, XStack} from "tamagui";
import {useI18nStore} from "@/stores/i18nStore";
import {useQuery} from "@tanstack/react-query";
import {ICategory, IFetchResponse, TMovieQuery} from "@/interfaces/IFetch";
import {getCategories} from "@/services/list.querys";
import {FilterMovieTypes, useMovieFilterStore} from "@/stores/MovieFilterStore";

const lang = {
  es: "esp",
  en: "eng",
};

const queryKeySelect = {
  movie: "movie-category",
  music: "music-category",
};

interface IProps {
  type?: "music" | "movie";
}

const CategorySelector = (props: IProps) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  const {data} = useQuery<IFetchResponse<ICategory>>({
    queryKey: [queryKeySelect[props.type ?? "movie"], locale],
    meta: {lang: lang[locale], type: props.type} as TMovieQuery,
    queryFn: getCategories,
  });

  return (
    <XStack
      paddingHorizontal={25}
      paddingVertical={5}
      alignItems="center"
      gap={10}>
      <H4 color={"white"} fontWeight={"bold"}>
        {props?.type === "movie"
          ? t("movie.title", {locale})
          : t("music.title", {locale})}
      </H4>

      {data?.results?.map(ct => (
        <CatBtn {...ct} key={ct.id} />
      ))}
    </XStack>
  );
};

const CatBtn = (props: ICategory) => {
  const setFilter = useMovieFilterStore(s => s.setFilter);
  const filter = useMovieFilterStore(s => s.filters);

  const isActive = filter.category === props.id;

  return (
    <Button
      onPress={() => setFilter("category", isActive ? "" : props.id)}
      borderColor={"white"}
      backgroundColor={isActive ? "white" : "unset"}
      color={isActive ? "#2988C8" : "white"}
      variant="outlined">
      {props.name}
    </Button>
  );
};

export default CategorySelector;
