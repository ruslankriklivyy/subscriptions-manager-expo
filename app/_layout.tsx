import { SplashScreen, Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';
import { Logs } from 'expo';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../config/firebase';
import UserService from '../services/UserService';
import { setUser } from '../stores/UserStore';

Logs.enableExpoCliLogging();

export default function Layout() {
  const [user] = useAuthState(auth);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (user) {
      UserService.getOne(user.uid).then((res) => {
        res && setUser(res);
      });
    }
  }, [user]);

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
