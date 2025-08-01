import React from "react";
import {Button} from "tamagui";
import CountryFlag from "react-native-country-flag";
import {useI18nStore} from "@/stores/i18nStore";
import {ChevronDown} from "@tamagui/lucide-icons";
import {useModalStore} from "@/stores/modalStore";

const CountrySelect = () => {
  const locale = useI18nStore(s => s.locale);
  const openModal = useModalStore(s => s.openModal);
  const value = useI18nStore(s => s.code);
  const handleOpen = () => openModal("lang-select", true);

  return (
    <>
      <Button
        chromeless
        backgroundColor={"rgba(255,255,255,.0)"}
        width={180}
        color={"white"}
        fontSize={"$6"}
        onPress={handleOpen}
        iconAfter={ChevronDown}>
        <CountryFlag isoCode={value} size={22} />
        {locale === "en" ? "English" : "Español"}
      </Button>
    </>
  );
};

export default CountrySelect;
