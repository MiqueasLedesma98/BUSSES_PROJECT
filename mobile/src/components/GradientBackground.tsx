import React from "react";
import {Dimensions} from "react-native";
import Svg, {Defs, LinearGradient, Stop, Rect} from "react-native-svg";
import {View} from "tamagui";

const {height, width} = Dimensions.get("screen");

const GradientBackground = () => {
  return (
    <View position="absolute" width={width} height={height} zIndex={-1}>
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id="grad" x1="30%" y1="30%" x2="100%" y2="100%">
            <Stop offset="10%" stopColor="#1A2B4C" stopOpacity="1" />
            <Stop offset="40%" stopColor="#0000" stopOpacity="1" />
            <Stop offset="80%" stopColor="#0F2747" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    </View>
  );
};

export default GradientBackground;
