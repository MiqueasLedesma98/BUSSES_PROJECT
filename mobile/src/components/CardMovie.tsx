import {baseUrl} from "@/axios.config";
import {IMovie} from "@/interfaces/IFetch";
import {useModalStore} from "@/stores/modalStore";
import React from "react";
import {Dimensions} from "react-native";
import {Card, CardBackground, CardFooter, Image, Text, YStack} from "tamagui";

const {width, height} = Dimensions.get("screen");

const cardHeight = height * 0.45;

const cardWidth = width * 0.25;

const CardMovie = (props: IMovie) => {
  const openModal = useModalStore(s => s.openModal);

  return (
    <Card
      margin={"$2"}
      width={cardWidth}
      height={cardHeight}
      overflow="hidden"
      onPress={() => openModal("movieDetail", props)}>
      <CardBackground>
        <Image
          width={cardWidth}
          height={cardHeight}
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
