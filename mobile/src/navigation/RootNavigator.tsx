import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import MovieScreen from "@/screens/MovieScreen";
import MusicScreen from "@/screens/MusicScreen";
import RootLayout from "@/layouts/RootLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import MediaPlayer from "@/screens/MediaPlayer";
import Config from "@/screens/Config";
import ConfigSeat from "@/screens/ConfigSeat";

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "fade",
      headerShown: false,
      freezeOnBlur: true,
    }}>
    <Stack.Screen
      name="Home"
      layout={({children, navigation}) => (
        <RootLayout navigation={navigation}>{children}</RootLayout>
      )}
      options={{contentStyle: {backgroundColor: "darkblue"}}}
      component={HomeScreen}
    />
    <Stack.Screen name="Music" layout={DefaultLayout} component={MusicScreen} />
    <Stack.Screen name="Movie" layout={DefaultLayout} component={MovieScreen} />
    <Stack.Screen
      name="Media-Player"
      options={{contentStyle: {backgroundColor: "#000"}}}
      component={MediaPlayer}
    />
    <Stack.Screen name="Config" layout={DefaultLayout} component={Config} />
    <Stack.Screen
      name="Config-seat"
      // layout={DefaultLayout}
      component={ConfigSeat}
    />
  </Stack.Navigator>
);

export default RootNavigator;
