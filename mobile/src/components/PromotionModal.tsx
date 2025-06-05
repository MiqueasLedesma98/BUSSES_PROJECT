import React, {useEffect} from "react";
import CustomSheet from "./CustomSheet";
import {useModalStore} from "@/stores/modalStore";
import {IPromotion} from "@/interfaces/IFetch";
import {H4, YStack} from "tamagui";
import api from "@/axios.config";

const PromotionModal = () => {
  const data = useModalStore(s => s.modals["promotion-detail"] as IPromotion);

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
        <H4 color={"#fff"}>{data?.description}</H4>
      </YStack>
    </CustomSheet>
  );
};

export default PromotionModal;
