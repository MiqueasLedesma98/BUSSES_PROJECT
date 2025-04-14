import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import React, {useRef, useState} from "react";
import {RouteProp, useRoute, useNavigation} from "@react-navigation/native";
import {IMovie} from "@/interfaces/IFetch";
import Video, {VideoRef} from "react-native-video";
import {Slider} from "tamagui";

const baseUrl = "https://nhvdt5z3-3000.brs.devtunnels.ms/api";

type RootStackParamList = {
  "Media-Player": IMovie;
};

type MediaPlayerRouteProp = RouteProp<RootStackParamList, "Media-Player">;

const MediaPlayer = () => {
  const route = useRoute<MediaPlayerRouteProp>();
  const navigation = useNavigation();
  const movie = route.params;

  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    videoRef.current?.seek(value);
    setCurrentTime(value);
  };

  const handleSeekForward = () => {
    videoRef.current?.seek(currentTime + 10);
  };

  const handleSeekBackward = () => {
    videoRef.current?.seek(currentTime - 10);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{uri: baseUrl + movie.url_path}}
        style={styles.backgroundVideo}
        paused={!isPlaying}
        resizeMode="contain"
        onProgress={({currentTime}) => setCurrentTime(currentTime)}
        onLoad={({duration}) => setDuration(duration)}
      />

      <View style={styles.topControls}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}>
          <Text style={styles.buttonText}>❌</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={0.1}
          onValueChange={val => handleSeek(val[0])}
          size="$4"
          theme="light"
          backgroundColor="rgba(255,255,255,0.3)"
          // accentColor="white"
          style={{width: "100%"}}
        />

        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={handleSeekBackward} style={styles.button}>
            <Text style={styles.buttonText}>⏪</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause} style={styles.button}>
            <Text style={styles.buttonText}>{isPlaying ? "⏸" : "▶️"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSeekForward} style={styles.button}>
            <Text style={styles.buttonText}>⏩</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundVideo: {
    flex: 1,
  },
  topControls: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
  },
  controls: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default MediaPlayer;
