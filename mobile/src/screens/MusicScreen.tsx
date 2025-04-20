import CategorySelector from "@/components/CategorySelector";
import MovieCarousel from "@/components/MovieCarousel";
import {NavigationProp} from "@react-navigation/native";
import React from "react";
import {ScrollView, Text, View, YStack} from "tamagui";

const MusicScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  return (
    <ScrollView>
      <YStack gap={10}>
        <MovieCarousel navigation={navigation} type="music" />
        <CategorySelector type="music" />
      </YStack>
    </ScrollView>
  );
};

export default MusicScreen;
