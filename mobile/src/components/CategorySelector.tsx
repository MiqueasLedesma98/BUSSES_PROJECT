import {View, Text} from "react-native";
import React from "react";
import {Button, H4, XStack} from "tamagui";

const CategorySelector = () => {
  return (
    <XStack
      paddingHorizontal={25}
      paddingVertical={5}
      alignItems="center"
      gap={10}>
      <H4 color={"white"} fontWeight={"bold"}>
        Películas
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
