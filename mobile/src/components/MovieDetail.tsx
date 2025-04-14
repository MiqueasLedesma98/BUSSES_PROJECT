import {H2, H4, H5, H6, Text} from "tamagui";
import {useModalStore} from "@/stores/modalStore";
import {Button, Image, Sheet, XStack, YStack} from "tamagui";
import {Star, StarFull, X} from "@tamagui/lucide-icons";
import {useI18nStore} from "@/stores/i18nStore";
import {useWindowDimensions} from "react-native";
import {NavigationProp} from "@react-navigation/native";

const baseUrl = "https://nhvdt5z3-3000.brs.devtunnels.ms/api";

const MovieDetail = ({navigation}: {navigation: NavigationProp<any>}) => {
  const t = useI18nStore(s => s.t);
  const locale = useI18nStore(s => s.locale);
  const {width} = useWindowDimensions();

  const data = useModalStore(s => s.getModalData("movieDetail"));
  const closeModal = useModalStore(s => s.closeModal);

  return (
    <Sheet
      native
      modal
      open={!!data}
      snapPoints={[70]}
      zIndex={100_000}
      dismissOnOverlayPress
      dismissOnSnapToBottom
      onOpenChange={() => closeModal("movieDetail")}
      animation="fast">
      <Sheet.Overlay
        open={!!data}
        animation="medium"
        backgroundColor="rgba(0,0,0,.3)"
      />
      <Sheet.Handle />
      <Sheet.Frame padding="$4" style={{opacity: 0.8, backgroundColor: "#000"}}>
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
              onPressOut={() => {
                navigation.navigate("Media-Player", data);
              }}
              backgroundColor={"#2988C8"}
              color="white"
              width={120}>
              {t("see", {locale})}
            </Button>
          </YStack>
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default MovieDetail;
