import React from "react";
import {createTamagui, TamaguiProvider} from "tamagui";
import {defaultConfig} from "@tamagui/config/v4";
import {NavigationContainer} from "@react-navigation/native";
import RootNavigator from "@/navigation/RootNavigator";
import {i18n} from "@/i18n";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {DevToolsBubble} from "react-native-react-query-devtools";
import BootSplash from "react-native-bootsplash";
import {LogBox} from "react-native";
import {useSqlite} from "@/hooks/useSqlite";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

i18n.locale = "es";

const config = createTamagui(defaultConfig);

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  useSqlite();

  return (
    <GestureHandlerRootView>
      <TamaguiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            onReady={async () => {
              BootSplash.hide({fade: true});
            }}>
            <RootNavigator />
          </NavigationContainer>
          <DevToolsBubble
            onCopy={txt => {
              return new Promise(resolve => {
                console.log(txt);
                resolve(true);
              });
            }}
          />
        </QueryClientProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}

export default App;
