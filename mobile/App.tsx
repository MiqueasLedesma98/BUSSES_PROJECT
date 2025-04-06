import React from 'react';
import {createTamagui, TamaguiProvider} from 'tamagui';
import {defaultConfig} from '@tamagui/config/v4';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigation/RootNavigator';

const config = createTamagui(defaultConfig);

function App(): React.JSX.Element {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TamaguiProvider>
  );
}

export default App;
