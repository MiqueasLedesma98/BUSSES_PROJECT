import React from "react";
import {IMovie} from "@/interfaces/IFetch";
import {useModalStore} from "@/stores/modalStore";
import {Card, Text, XStack, YStack} from "tamagui";
import {SquarePlay} from "@tamagui/lucide-icons";
import {Dimensions} from "react-native";
const {width} = Dimensions.get("window");

const CardMusic = (props: IMovie) => {
  const openModal = useModalStore(s => s.openModal);

  return (
    <Card
      margin="$2"
      alignItems="flex-start"
      borderWidth={2}
      padding="$2"
      borderColor={"white"}
      borderRadius={25}
      backgroundColor={"rgba(0,0,0,0)"}
      width={width * 0.3}
      height={100}
      overflow="hidden"
      onPress={() => openModal("movieDetail", props)}>
      <XStack gap={10} alignItems="center">
        <SquarePlay color={"white"} size={"$8"} />
        <YStack justifyContent="center">
          <Text fontWeight={"bold"} fontSize={"$4"} color={"white"}>
            {props.title}
          </Text>
          <Text color={"white"}>{props.duration}</Text>
        </YStack>
      </XStack>
    </Card>
  );
};

export default CardMusic;
