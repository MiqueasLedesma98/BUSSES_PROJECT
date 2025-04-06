import React from "react";
import {Text, View} from "tamagui";

const BannerBottom = () => {
  return (
    <View
      height={80}
      width={"100%"}
      backgroundColor="rgba(255, 255, 255, 0.5)"
      borderTopLeftRadius={25}
      borderTopRightRadius={25}>
      <Text color="white" textAlign="center" marginTop={35}>
        Este es un banner negro con opacidad 0.5
      </Text>
    </View>
  );
};

export default BannerBottom;
