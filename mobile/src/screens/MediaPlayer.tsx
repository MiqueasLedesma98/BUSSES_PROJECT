import React, {useEffect, useRef, useState} from "react";
import {RouteProp, useRoute, useNavigation} from "@react-navigation/native";
import {IMovie} from "@/interfaces/IFetch";
import Video, {VideoRef} from "react-native-video";
import {baseUrl} from "@/axios.config";
import {Button} from "tamagui";
import {X} from "@tamagui/lucide-icons";

type RootStackParamList = {
  "Media-Player": IMovie;
};

type MediaPlayerRouteProp = RouteProp<RootStackParamList, "Media-Player">;

const MediaPlayer = () => {
  const route = useRoute<MediaPlayerRouteProp>();
  const navigation = useNavigation();
  const movie = route.params;
  const [closeBtn, setCloseBtn] = useState(true);
  const [isAdPlaying, setIsAdPlaying] = useState(true);

  const videoRef = useRef<VideoRef>(null);

  return (
    <>
      {closeBtn && (
        <Button
          onPress={navigation.goBack}
          zIndex={10}
          position="absolute"
          top={"$4"}
          left={"$4"}
          variant="outlined">
          <X color={"red"} />
        </Button>
      )}
      <Video
        controlsStyles={{hideFullscreen: true}}
        onControlsVisibilityChange={() => setCloseBtn(prev => !prev)}
        controls={true}
        ref={videoRef}
        source={{uri: baseUrl + movie.url_path}}
        style={{
          flex: 1,
        }}
        onFullscreenPlayerDidDismiss={navigation.goBack}
        onEnd={navigation.goBack}
        resizeMode="contain"
      />
    </>
  );
};

export default MediaPlayer;
