import {H4, Text} from "tamagui";
import {useModalStore} from "@/stores/modalStore";
import {Button, Image, Sheet, XStack, YStack} from "tamagui";
import {StarFull} from "@tamagui/lucide-icons";
import {useI18nStore} from "@/stores/i18nStore";
import {useWindowDimensions} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import CustomSheet from "./CustomSheet";

const baseUrl = "https://nhvdt5z3-3000.brs.devtunnels.ms/api";

const MovieDetail = ({navigation}: {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);
  const {width} = useWindowDimensions();

  const data = useModalStore(s => s.getModalData("movieDetail"));

  const closeModal = useModalStore(s => s.closeModal);

  return (
    <CustomSheet
      frameStyle={{opacity: 0.8, padding: 10}}
      modalKey="movieDetail"
      bgColor={"#000"}>
      <XStack gap={"$4"} padding="$4">
        <Image
          style={{
            marginHorizontal: 20,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 15,
          }}
          resizeMode="cover"
          source={{
            uri: data?.cover_path
              ? baseUrl + data?.cover_path
              : require("../assets/no-image.png"),
            height: width * 0.25,
            width: width * 0.25,
          }}
        />
        <YStack width={width * 0.6}>
          {/* Header */}
          <XStack justifyContent="space-between">
            <H4 fontWeight={"bold"} color="white">
              {data?.title}
            </H4>
            <XStack gap={"$2"} alignItems="center" justifyContent="center">
              <StarFull size={14} color={"yellow"} />
              <Text fontSize={18} color={"white"}>
                {data?.rate} / 10
              </Text>
            </XStack>
          </XStack>

          <Text fontSize={18} color={"white"}>
            {data?.year} $Category {data?.duration}
          </Text>

          <Text color="white">{data?.description}</Text>

          <Button
            marginTop={"$6"}
            onPressOut={async () => {
              navigation.navigate("Media-Player", data);
              setTimeout(() => closeModal("movieDetail"), 1000);
            }}
            backgroundColor={"#2988C8"}
            color="white"
            width={120}>
            {t("see", {locale})}
          </Button>
        </YStack>
      </XStack>
    </CustomSheet>
  );
};

export default MovieDetail;
