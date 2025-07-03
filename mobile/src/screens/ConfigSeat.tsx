import React from "react";
import {NavigationProp} from "@react-navigation/native";
import {Button, H5, XStack, YStack} from "tamagui";
import {ArrowLeft} from "@tamagui/lucide-icons";
import {useI18nStore} from "@/stores/i18nStore";

export default function ConfigSeat({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);

  return (
    <YStack gap="$2">
      <XStack gap="$2" alignItems="center">
        <Button
          borderWidth={2}
          borderColor={"white"}
          onPress={() => navigation.goBack()}
          width={70}
          height={60}
          margin={12.5}
          color={"white"}
          backgroundColor={"rgba(255,255,255, .2)"}>
          <ArrowLeft size={50} color={"white"} />
        </Button>
        <H5 color={"#fff"} fontWeight={"bold"}>
          {t("config", {locale})}
        </H5>
      </XStack>
    </YStack>
  );
}
