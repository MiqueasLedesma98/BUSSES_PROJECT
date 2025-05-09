import React, {useState} from "react";
import {Button, H4, ListItem, Sheet, Text, YGroup} from "tamagui";
import CountryFlag from "react-native-country-flag";
import {Language, useI18nStore} from "@/stores/i18nStore";
import {ChevronDown} from "@tamagui/lucide-icons";
import CustomSheet from "./CustomSheet";
import {useModalStore} from "@/stores/modalStore";

const countries = [
  {code: "US", label: "English", locale: "en"},
  {code: "ES", label: "Español", locale: "es"},
];

const CountrySelect = () => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);
  const setLocale = useI18nStore(s => s.setLocale);
  const openModal = useModalStore(s => s.openModal);
  const close = useModalStore(s => s.closeModal);
  const [value, setValue] = useState(locale === "en" ? "US" : "ES");

  const handleOpen = () => openModal("lang-select", true);
  const handleClose = () => close("lang-select");

  return (
    <>
      <Button
        backgroundColor={"rgba(255,255,255,.0)"}
        width={180}
        color={"white"}
        fontSize={"$6"}
        onPress={handleOpen}
        iconAfter={ChevronDown}>
        <CountryFlag isoCode={value} size={22} />
        {locale === "en" ? "English" : "Español"}
      </Button>
      <CustomSheet
        sheetProps={{snapPoints: [35]}}
        modalKey="lang-select"
        topEl={
          <H4 marginVertical={"$2"} color={"white"}>
            {t("select-lang-header", {locale})}
          </H4>
        }>
        <YGroup
          padding={"$4"}
          alignSelf="center"
          width={"100%"}
          paddingHorizontal={10}
          size="$4">
          {countries.map(country => (
            <YGroup.Item key={country.code}>
              <ListItem
                // height={45}
                onPress={() => {
                  handleClose();
                  setValue(() => country.code);
                  setLocale(country.locale as Language);
                }}
                onPressOut={() => {
                  handleClose();
                  setValue(() => country.code);
                  setLocale(country.locale as Language);
                }}
                pressTheme
                iconAfter={<CountryFlag isoCode={country.code} size={22} />}>
                <Text>{country.label}</Text>
              </ListItem>
            </YGroup.Item>
          ))}
        </YGroup>
      </CustomSheet>
    </>
  );
};

export default CountrySelect;
