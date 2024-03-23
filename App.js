import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Offline from './screens/OfflineScreen';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    DMSansBold: require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    DMSansMedium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMSansRegular: require('./assets/fonts/DMSans-Regular.ttf')
  });

  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {isConnected ? <Navigation /> : <Offline />}
    </View>
  );
}
