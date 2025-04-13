import React, {useState} from "react";
import {Button, H4, ListItem, Sheet, Text, YGroup} from "tamagui";
import CountryFlag from "react-native-country-flag";
import {Language, useI18nStore} from "@/stores/i18nStore";
import {ChevronDown} from "@tamagui/lucide-icons";

const countries = [
  {code: "US", label: "English", locale: "en"},
  {code: "ES", label: "Español", locale: "es"},
];

const CountrySelect = () => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);
  const setLocale = useI18nStore(s => s.setLocale);

  const [value, setValue] = useState(locale === "en" ? "US" : "ES");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        backgroundColor={"rgba(255,255,255,.5)"}
        width={180}
        onPress={() => setOpen(prev => !prev)}
        iconAfter={ChevronDown}>
        <CountryFlag isoCode={value} size={22} />
        {locale === "en" ? "English" : "Español"}
      </Button>
      <Sheet
        open={open}
        onOpenChange={() => setOpen(prev => !prev)}
        dismissOnSnapToBottom
        animation={"medium"}
        modal
        snapPoints={[35]}>
        <Sheet.Overlay
          animation="medium"
          backgroundColor="$shadow2"
          enterStyle={{opacity: 0}}
          exitStyle={{opacity: 0}}
        />
        <Sheet.Handle />
        <Sheet.Frame backgroundColor={"#333"} flex={1}>
          <YGroup
            alignSelf="center"
            width={"100%"}
            paddingHorizontal={10}
            size="$4">
            <H4 color={"white"}>{t("select-lang-header", {locale})}</H4>
            {countries.map(country => (
              <YGroup.Item key={country.code}>
                <ListItem
                  // height={45}
                  onPress={() => {
                    setOpen(() => false);
                    setValue(() => country.code);
                    setLocale(country.locale as Language);
                  }}
                  onPressOut={() => {
                    setOpen(() => false);
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
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default CountrySelect;
