import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';

import { MainButton } from './MainButton';
import AuthService from '../../services/AuthService';

WebBrowser.maybeCompleteAuthSession();

export const FormSocials = () => {
  const [request, response, promptAsync] = useAuthRequest({
    androidClientId: Constants?.expoConfig?.extra?.FIREBASE_ANDROID_CLIENT_ID,
    expoClientId: Constants?.expoConfig?.extra?.GOOGLE_AUTH_CLIENT_ID,
    iosClientId: Constants?.expoConfig?.extra?.GOOGLE_AUTH_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      AuthService.googleAuth(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <>
      <MainButton
        disabled={!request}
        title={'Sign up with Google'}
        type={'outlined'}
        Icon={<AntDesign name="google" size={26} />}
        onPress={() => promptAsync()}
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
