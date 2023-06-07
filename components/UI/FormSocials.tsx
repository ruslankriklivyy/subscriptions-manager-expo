import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firebase from 'firebase/compat';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { signInWithCredential } from 'firebase/auth';
import Constants from 'expo-constants';

import { MainButton } from './MainButton';
import { setModal } from '../../stores/ModalStore';
import userService from '../../services/UserService';
import { setUser } from '../../stores/UserStore';
import { auth } from '../../config/firebase';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  offlineAccess: true,
  webClientId: Constants?.expoConfig?.extra?.FIREBASE_WEB_CLIENT_ID,
});

export const FormSocials = () => {
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const userGoogleInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userGoogleInfo.idToken);

      await signInWithCredential(auth, googleCredential);
      await userService.create(
        {
          uid: userGoogleInfo.user.id,
          email: userGoogleInfo.user.email,
          displayName: userGoogleInfo.user.givenName,
          avatar: { url: userGoogleInfo.user.photo },
        },
        'google'
      );

      const user = await userService.getOne(userGoogleInfo.user.id);
      setUser(user);
      router.push('/home');
    } catch (error) {
      console.log(error);
      setModal({ message: error.message, type: 'error' });
    }
  };

  return (
    <>
      <MainButton
        title={'Sign up with Google'}
        type={'outlined'}
        Icon={<AntDesign name="google" size={26} />}
        onPress={handleGoogleAuth}
      />

      <View style={styles.socialsBottom}>
        <View style={styles.socialsBottomLine}></View>
        <Text style={styles.socialsBottomText}>OR</Text>
        <View style={styles.socialsBottomLine}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  socialsBottom: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialsBottomLine: {
    width: '42%',
    height: 2,
    backgroundColor: '#f3f3f3',
  },
  socialsBottomText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
    opacity: 0.6,
    marginHorizontal: 15,
  },
});
