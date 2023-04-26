import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { MainButton } from '../components/UI/MainButton';

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.box}>
      <ImageBackground
        source={require('../assets/get_started_bg.jpg')}
        resizeMode={'cover'}
        style={styles.bgImage}
      >
        <View style={styles.bottomBox}>
          <Text style={styles.text}>Streamline your subscriptions, simplify your life</Text>

          <MainButton title={'Get started'} onPress={() => router.push('/auth/signup')} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  bottomBox: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: 42,
    marginBottom: 45,
    lineHeight: 55,
    textAlign: 'center',
  },
});
