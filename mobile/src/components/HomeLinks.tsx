import {View, Text} from "react-native";
import React from "react";
import {Button, XStack} from "tamagui";
import {Music4} from "@tamagui/lucide-icons";

const HomeLinks = () => {
  return (
    <XStack marginVertical={25}>
      <Button transparent>Películas</Button>
      <Button icon={Music4}>Música</Button>
    </XStack>
  );
};

export default HomeLinks;
