import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import MovieScreen from "@/screens/MovieScreen";
import MusicScreen from "@/screens/MusicScreen";
import RootLayout from "@/layouts/RootLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import MediaPlayer from "@/screens/MediaPlayer";

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
      layout={({children}) => <RootLayout>{children}</RootLayout>}
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
  </Stack.Navigator>
);

export default RootNavigator;
