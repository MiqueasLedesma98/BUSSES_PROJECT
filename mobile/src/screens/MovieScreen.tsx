import React from "react";
import CardMovie from "@/components/CardMovie";
import {ScrollView, YStack} from "tamagui";
import MovieCarousel from "@/components/MovieCarousel";
import CategorySelector from "@/components/CategorySelector";

const MovieScreen = () => {
  return (
    <ScrollView>
      <YStack gap={10}>
        <MovieCarousel />
        <CategorySelector />
        <YStack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={10}
          padding={10}>
          <CardMovie />
          <CardMovie />
          <CardMovie />
          <CardMovie />
          <CardMovie />
          <CardMovie />
          <CardMovie />
          <CardMovie />
          <CardMovie />
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default MovieScreen;
