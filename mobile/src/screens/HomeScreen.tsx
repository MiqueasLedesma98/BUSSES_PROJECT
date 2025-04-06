import BannerBottom from "@/components/BannerBottom";
import BannerWelcome from "@/components/BannerWelcome";
import HomeLinks from "@/components/HomeLinks";
import React from "react";
import {ScrollView, Text, View} from "tamagui";

const Home = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      flex={1}
      padding={15}
      height={"100%"}
      backgroundColor={"rgba(0,0,0,0)"}>
      <BannerWelcome />
      <HomeLinks />
      <BannerBottom />
    </ScrollView>
  );
};

export default Home;
