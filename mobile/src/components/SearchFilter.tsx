import {useI18nStore} from "@/stores/i18nStore";
import {useMovieFilterStore} from "@/stores/MovieFilterStore";
import {Search, Settings2} from "@tamagui/lucide-icons";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {Button, Input, XStack} from "tamagui";

const SearchFilter = () => {
  const [s, setS] = useState("");
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);
  const [open, setOpen] = useState(false);

  const setFilter = useMovieFilterStore(s => s.setFilter);

  return (
    <XStack position="absolute" zIndex={200} top="$2" right="$2">
      {open && (
        <Input
          value={s}
          onChangeText={t => setS(t)}
          color={"#2988C8"}
          width={150}
          placeholder={t("search", {locale})}
          onSubmitEditing={() => setFilter("search", s)}
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          returnKeyType="done"
        />
      )}
      <Button
        height="$4"
        width="$4"
        onPress={() => setOpen(prev => !prev)}
        borderTopLeftRadius={open ? 0 : "$4"}
        borderBottomLeftRadius={open ? 0 : "$4"}>
        <Search color={"#2988C8"} />
      </Button>
      <Button chromeless height="$4" width="$4">
        <Settings2 />
      </Button>
    </XStack>
  );
};

export default SearchFilter;
