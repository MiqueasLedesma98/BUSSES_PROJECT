import React, {useEffect} from "react";
import CustomSheet from "./CustomSheet";
import {useModalStore} from "@/stores/modalStore";
import {IPromotion} from "@/interfaces/IFetch";
import {
  H2,
  H4,
  Image,
  Text,
  useWindowDimensions,
  XStack,
  YStack,
} from "tamagui";
import api, {baseUrl} from "@/axios.config";

const PromotionModal = () => {
  const data = useModalStore(s => s.modals["promotion-detail"] as IPromotion);

  const {width} = useWindowDimensions();

  useEffect(() => {
    if (data?.id) {
      api.put(`/view/${data.id}`).catch(err => {
        console.error("Error incrementando vista:", err);
      });
    }
  }, [data]);

  return (
    <CustomSheet
      frameStyle={{opacity: 0.8, padding: 10}}
      bgColor={"#000"}
      modalKey="promotion-detail">
      <YStack padding={"$4"} gap={"$4"}>
        <XStack>
          <Image
            style={{
              marginHorizontal: 20,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 15,
            }}
            resizeMode="cover"
            source={{
              uri: data?.path_secondary
                ? baseUrl + data?.path_secondary
                : require("../assets/no-image.png"),
              height: width * 0.25,
              width: width * 0.25,
            }}
          />
          <YStack width={width * 0.6}>
            <H2 color={"#fff"}>{data?.title}</H2>
            <Text color="white">{data?.description}</Text>
          </YStack>
        </XStack>
      </YStack>
    </CustomSheet>
  );
};

export default PromotionModal;
