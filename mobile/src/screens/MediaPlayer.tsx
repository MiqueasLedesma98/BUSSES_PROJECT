import React, {useRef, useState} from "react";
import {RouteProp, useRoute, useNavigation} from "@react-navigation/native";
import {IMovie} from "@/interfaces/IFetch";
import Video, {VideoRef} from "react-native-video";
import {baseUrl} from "@/axios.config";
import {Button, Image, View} from "tamagui";
import {X} from "@tamagui/lucide-icons";

type RootStackParamList = {
  "Media-Player": IMovie;
};

type MediaPlayerRouteProp = RouteProp<RootStackParamList, "Media-Player">;

const MediaPlayer = () => {
  const route = useRoute<MediaPlayerRouteProp>();
  const navigation = useNavigation();
  const movie = route.params;

  const videoRef = useRef<VideoRef>(null);
  const isAudio = movie.url_path?.toLowerCase().endsWith(".mp3");

  const [closeBtn, setCloseBtn] = useState(true);
  const [isAdPlaying, setIsAdPlaying] = useState(!isAudio);

  const adUrl =
    baseUrl + "/media/movie/eng/cfd45f74-b5c3-46de-a8ab-e95a0dabe466.mp4";

  const handleEnd = () => {
    if (isAdPlaying) {
      setIsAdPlaying(false);
    } else {
      navigation.goBack();
    }
  };

  const videoSource = isAdPlaying
    ? {uri: adUrl}
    : {uri: baseUrl + movie.url_path};

  return (
    <>
      {closeBtn && (
        <Button
          onPress={navigation.goBack}
          zIndex={10}
          position="absolute"
          top="$4"
          left="$4"
          variant="outlined">
          <X color="red" />
        </Button>
      )}

      <View flex={1} position="relative">
        {isAudio && (
          <Image
            source={{uri: baseUrl + movie.cover_path}}
            resizeMode="cover"
            style={{
              width: 300,
              height: 200,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: [{translateX: -0.5 * 300}, {translateY: -0.5 * 200}],
              zIndex: 1,
            }}
          />
        )}

        <Video
          disableAudioSessionManagement={false}
          controls={!isAdPlaying && !isAudio}
          ref={videoRef}
          source={videoSource}
          style={{flex: 1, backgroundColor: "black"}}
          resizeMode="contain"
          onEnd={handleEnd}
          onFullscreenPlayerDidDismiss={navigation.goBack}
          onControlsVisibilityChange={() => setCloseBtn(prev => !prev)}
        />
      </View>
    </>
  );
};

export default MediaPlayer;
