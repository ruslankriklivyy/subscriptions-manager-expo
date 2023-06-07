import { GoogleSignin } from '@react-native-google-signin/google-signin';

class AuthService {
  static async googleAuth() {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  }
}

export default AuthService;
