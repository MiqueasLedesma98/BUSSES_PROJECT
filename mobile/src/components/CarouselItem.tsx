import {baseUrl} from "@/axios.config";
import {IMovie} from "@/interfaces/IFetch";
import {useI18nStore} from "@/stores/i18nStore";
import {NavigationProp} from "@react-navigation/native";
import React from "react";
import {Dimensions} from "react-native";
import {
  Card,
  Image,
  Button,
  XStack,
  YStack,
  H5,
  Separator,
  Text,
} from "tamagui";

const {width, height} = Dimensions.get("screen");

const CarouselItem = (data: IMovie & {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  return (
    <Card borderWidth={0} height={height * 0.45}>
      <Card.Background>
        <Image
          source={{uri: baseUrl + data?.cover_path}}
          resizeMode="stretch"
          height={height * 0.45}
          width={"100%"}
        />
      </Card.Background>

      <Card.Footer backgroundColor={"rgba(0,0,0,.3)"} padding={"$2"}>
        <XStack
          width={"100%"}
          justifyContent="space-between"
          alignItems="center">
          <YStack>
            <H5 fontWeight={"bold"} color="white">
              {data.title}
            </H5>
            <Separator />
            <Text
              fontSize={14}
              color={"white"}
              maxInlineSize={width * 0.5}
              textOverflow="ellipsis"
              textBreakStrategy="balanced">
              {data.description}
            </Text>
          </YStack>
          <Button
            onPress={() => data?.navigation.navigate("Media-Player", data)}
            fontWeight={"normal"}
            fontSize={18}
            color="white"
            backgroundColor={"#2988C8"}>
            {t("see", {locale})}
          </Button>
        </XStack>
      </Card.Footer>
    </Card>
  );
};

export default CarouselItem;
