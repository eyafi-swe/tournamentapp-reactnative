import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import MainStack from './components/navigation/MainStack';
import UserContext from './context/UserContext';

export default function App() {

  let [fontsLoaded] = useFonts({
    'inter-bold': require('./assets/fonts/Inter-Bold.ttf'),
    'inter-medium': require('./assets/fonts/Inter-Medium.ttf'),
    'inter-semibold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'inter-regular': require('./assets/fonts/Inter-Regular.ttf'),
    'gaming-font': require('./assets/fonts/gamingfont.ttf'),
  })

  useEffect(() => {
    const AutoHide = async () => {
      await SplashScreen.preventAutoHideAsync()
    }
    AutoHide()
  }, [])

  useEffect(() => {
    const hideAsync = async () => {
      await SplashScreen.hideAsync()
    }
    if (fontsLoaded) {
      hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <UserContext>

      <NavigationContainer>
        <View style={{ flex: 1, backgroundColor: 'white' }} >
          <StatusBar style="dark" />
          <MainStack />
        </View>
      </NavigationContainer>
    </UserContext>

  );
}
