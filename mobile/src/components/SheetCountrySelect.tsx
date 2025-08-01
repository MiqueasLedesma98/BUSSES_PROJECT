import React from "react";
import CustomSheet from "./CustomSheet";
import {H4, ListItem, Text, YGroup} from "tamagui";
import {useModalStore} from "@/stores/modalStore";
import {Language, useI18nStore} from "@/stores/i18nStore";
import CountryFlag from "react-native-country-flag";

const countries = [
  {code: "US", label: "English", locale: "en"},
  {code: "ES", label: "Español", locale: "es"},
];

const SheetCountrySelect = () => {
  const close = useModalStore(s => s.closeModal);
  const handleClose = () => close("lang-select");
  const locale = useI18nStore(s => s.locale);
  const setLocale = useI18nStore(s => s.setLocale);
  const t = useI18nStore(s => s.t);

  return (
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
              onPress={() => {
                handleClose();
                setLocale(country.locale as Language);
              }}
              onPressOut={() => {
                handleClose();
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
  );
};

export default SheetCountrySelect;
