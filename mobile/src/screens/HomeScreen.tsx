import BannerBottom from "@/components/BannerBottom";
import BannerWelcome from "@/components/BannerWelcome";
import HomeLinks from "@/components/HomeLinks";
import React from "react";
import {ScrollView} from "tamagui";
import {NavigationProp} from "@react-navigation/native";
import PromotionModal from "@/components/PromotionModal";

const Home = ({navigation}: {navigation: NavigationProp<any>}) => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        flex={1}
        height={"100%"}
        backgroundColor={"rgba(0,0,0,0)"}>
        <BannerWelcome />
        <HomeLinks navigation={navigation} />
        <BannerBottom height={80} />
      </ScrollView>
      <PromotionModal />
    </>
  );
};

export default Home;
