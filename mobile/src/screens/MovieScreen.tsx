import React from "react";
import CardMovie from "@/components/CardMovie";
import {H2, ScrollView, YStack} from "tamagui";
import MovieCarousel from "@/components/MovieCarousel";
import CategorySelector from "@/components/CategorySelector";
import {useQuery} from "@tanstack/react-query";
import {getMovies} from "@/services/list.querys";
import {IFetchResponse, IMovie} from "@/interfaces/IFetch";

const MovieScreen = () => {
  const movies = useQuery<IFetchResponse<IMovie>>({
    queryKey: ["movies"],
    meta: {limit: 50, page: 1},
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
          {movies?.data?.results.map(item => (
            <CardMovie {...item} key={item.id} />
          ))}

          {!movies?.data?.total ? (
            <H2 marginVertical={20} color={"white"}>
              No se encuentran películas
            </H2>
          ) : null}
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default MovieScreen;
