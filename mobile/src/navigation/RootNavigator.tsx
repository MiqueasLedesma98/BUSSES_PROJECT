import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import MovieScreen from "@/screens/MovieScreen";
import MusicScreen from "@/screens/MusicScreen";
import RootLayout from "@/layouts/RootLayout";
import DefaultLayout from "@/layouts/DefaultLayout";

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
    <Stack.Screen
      name="Music"
      layout={({children, navigation}) => (
        <DefaultLayout navigation={navigation}>{children}</DefaultLayout>
      )}
      component={MusicScreen}
    />
    <Stack.Screen
      name="Movie"
      layout={({children, navigation}) => (
        <DefaultLayout navigation={navigation}>{children}</DefaultLayout>
      )}
      component={MovieScreen}
    />
  </Stack.Navigator>
);

export default RootNavigator;
