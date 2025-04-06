import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import MovieScreen from "@/screens/MovieScreen";
import MusicScreen from "@/screens/MusicScreen";
import RootLayout from "@/layouts/RootLayout";

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    layout={({children}) => <RootLayout>{children}</RootLayout>}
    screenOptions={{
      headerShown: false,
      freezeOnBlur: true,
    }}>
    <Stack.Screen
      name="Home"
      options={{contentStyle: {backgroundColor: "darkblue"}}}
      component={HomeScreen}
    />
    <Stack.Screen name="Music" component={MusicScreen} />
    <Stack.Screen name="Movie" component={MovieScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
