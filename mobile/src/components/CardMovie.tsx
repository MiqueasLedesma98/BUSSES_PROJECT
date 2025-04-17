import {IMovie} from "@/interfaces/IFetch";
import {useModalStore} from "@/stores/modalStore";
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

const baseUrl = "https://nhvdt5z3-3000.brs.devtunnels.ms/api";

const CardMovie = (props: IMovie) => {
  const openModal = useModalStore(s => s.openModal);

  return (
    <Card
      width={250}
      height={250}
      overflow="hidden"
      onPress={() => openModal("movieDetail", props)}>
      <CardBackground>
        <Image
          width={250}
          height={250}
          alignSelf="center"
          resizeMode="cover"
          source={{uri: baseUrl + props.cover_path}}
        />
      </CardBackground>
      <CardFooter
        maxHeight={90}
        padding={"$2"}
        backgroundColor={"rgba(255,255,255, 0.7)"}>
        <YStack paddingLeft={10}>
          <Text
            fontSize={18}
            fontWeight={"bold"}
            maxInlineSize={200}
            numberOfLines={1}
            ellipsizeMode="tail"
            textAlign="left">
            {props.title}
          </Text>
          <Text fontSize={16} fontWeight={"normal"}>
            {props.year} | Genero
          </Text>
        </YStack>
      </CardFooter>
    </Card>
  );
};

export default CardMovie;
