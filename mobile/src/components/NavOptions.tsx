import {useI18nStore} from "@/stores/i18nStore";
import {NavigationProp} from "@react-navigation/native";
import React from "react";
import {TouchableWithoutFeedback} from "react-native";
import CountryFlag from "react-native-country-flag";
import {Button, H2, Image, Text, XStack} from "tamagui";

const NavOptions = ({navigation}: {navigation: NavigationProp<any>}) => {
  const setLocale = useI18nStore(s => s.setLocale);

  return (
    <XStack gap={15}>
      <Button transparent onPress={() => setLocale("es")}>
        <XStack gap={5}>
          <CountryFlag isoCode="es" size={25} />
          <Text color={"white"}>Español</Text>
        </XStack>
      </Button>
      <Button transparent onPress={() => setLocale("en")}>
        <XStack gap={5}>
          <CountryFlag isoCode="us" size={25} />
          <Text color={"white"}>English</Text>
        </XStack>
      </Button>

      <TouchableWithoutFeedback
        onLongPress={() => navigation.navigate("Config")}>
        <XStack gap={10}>
          <H2 color={"white"}>22</H2>
          <Image source={require("../assets/seat.png")} />
        </XStack>
      </TouchableWithoutFeedback>
    </XStack>
  );
};

export default NavOptions;
