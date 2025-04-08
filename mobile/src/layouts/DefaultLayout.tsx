import CountrySelect from "@/components/CountrySelect";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ArrowRight, Film, Music4} from "@tamagui/lucide-icons";
import React from "react";

import {Button, Image, Text, View, XStack, YStack} from "tamagui";

interface DefaultLayoutProps {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<any>;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  navigation,
}) => {
  return (
    <XStack flex={1}>
      <YStack alignItems="center" gap={10} width={200} backgroundColor={"#333"}>
        <Image
          width={150}
          resizeMode="contain"
          source={require("../assets/veotrans-logo.png")}
        />
        <Button
          icon={Film}
          iconAfter={ArrowRight}
          width={180}
          backgroundColor={"rgba(255,255,255,.5)"}
          onPress={() => navigation.navigate("Movie")}>
          Películas
        </Button>
        <Button
          icon={Music4}
          iconAfter={ArrowRight}
          width={180}
          backgroundColor={"rgba(255,255,255,.5)"}
          onPress={() => navigation.navigate("Music")}>
          Música
        </Button>
        <View
          backgroundColor={"rgba(255,255,255,.5)"}
          height={250}
          width={180}
          justifyContent="center"
          alignItems="center"
          borderRadius={"$6"}>
          <Text>Banner Left</Text>
        </View>
        <CountrySelect />
      </YStack>
      {children}
    </XStack>
  );
};

export default DefaultLayout;
