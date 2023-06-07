import { SplashScreen, Slot, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';
import { Logs } from 'expo';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useStore } from 'effector-react';
import { auth } from '../config/firebase';
import UserService from '../services/UserService';
import { setUser } from '../stores/UserStore';
import { $modal, setModal } from '../stores/ModalStore';
import { MainModal } from '../components/UI/MainModal';
import { ResultBlock } from '../components/UI/ResultBlock';

Logs.enableExpoCliLogging();

export default function Layout() {
  const modal = useStore($modal);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const closeModal = () => {
    setModal(null);
  };

  useEffect(() => {
    if (user) {
      UserService.getOne(user.uid).then((res) => {
        res && setUser(res);
        router.push('/home');
      });
    }
  }, [user]);

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Slot />

      {modal && (
        <MainModal isModalVisible={!!modal} onClose={closeModal}>
          <ResultBlock message={modal.message} type={modal.type} onClose={closeModal} />
        </MainModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
