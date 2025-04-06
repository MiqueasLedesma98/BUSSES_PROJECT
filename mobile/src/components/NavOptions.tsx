import React from "react";
import CountryFlag from "react-native-country-flag";
import {Button, H1, H2, Image, Text, XStack} from "tamagui";

const NavOptions = () => {
  return (
    <XStack gap={15}>
      <Button transparent>
        <XStack gap={5}>
          <CountryFlag isoCode="es" size={25} />
          <Text color={"white"}>Español</Text>
        </XStack>
      </Button>
      <Button transparent>
        <XStack gap={5}>
          <CountryFlag isoCode="us" size={25} />
          <Text color={"white"}>English</Text>
        </XStack>
      </Button>

      <XStack gap={10}>
        <H2 color={"white"}>22</H2>
        <Image source={require("../assets/seat.png")} />
      </XStack>
    </XStack>
  );
};

export default NavOptions;
