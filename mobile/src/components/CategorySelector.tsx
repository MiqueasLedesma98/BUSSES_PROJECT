import React from "react";
import {Button, H4, XStack} from "tamagui";
import {useI18nStore} from "@/stores/i18nStore";

const CategorySelector = () => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);
  return (
    <XStack
      paddingHorizontal={25}
      paddingVertical={5}
      alignItems="center"
      gap={10}>
      <H4 color={"white"} fontWeight={"bold"}>
        {t("movie.title", {locale})}
      </H4>
      <Button
        borderColor={"white"}
        backgroundColor={"white"}
        color={"#2988C8"}
        variant="outlined">
        Acción
      </Button>
      <Button borderColor={"white"} color={"white"} variant="outlined">
        Acción
      </Button>
      <Button borderColor={"white"} color={"white"} variant="outlined">
        Acción
      </Button>
      <Button borderColor={"white"} color={"white"} variant="outlined">
        Acción
      </Button>
    </XStack>
  );
};

export default CategorySelector;
