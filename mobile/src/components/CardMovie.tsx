import React from "react";
import {
  Card,
  CardBackground,
  CardFooter,
  H4,
  Image,
  Text,
  YStack,
} from "tamagui";

interface CardProps {
  id: string;
  title: string;
  lang?: "esp" | "eng";
  type?: "movie" | "music";
  description?: string;
  cover_path?: string;
  duration?: string;
  rate?: number;
  url_path?: string;
  views?: number;
  year?: string;
}

const CardMovie = () => {
  return (
    <Card width={250} height={250} overflow="hidden">
      <CardBackground>
        <Image
          width={250}
          height={250}
          alignSelf="center"
          resizeMode="contain"
          source={{uri: "https://picsum.photos/500"}}
        />
      </CardBackground>
      <CardFooter backgroundColor={"rgba(255,255,255, 0.8)"}>
        <YStack paddingLeft={10}>
          <H4 fontWeight={"bold"}>Titulo</H4>
          <Text fontSize={18} fontWeight={"normal"}>
            Año | Genero
          </Text>
        </YStack>
      </CardFooter>
    </Card>
  );
};

export default CardMovie;
