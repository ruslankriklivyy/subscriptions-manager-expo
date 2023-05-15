import axios from 'axios';

import UserService from './UserService';

class AuthService {
  static async googleAuth(token: string) {
    const { data } = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    await UserService.create(data);
  }
}

export default AuthService;
