import { query, collection, getDocs, setDoc, updateDoc, where, doc } from '@firebase/firestore';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';

import { db } from '../config/firebase';
import { IUser } from '../types/entities/User';
import { IUserEditFormValues } from '../components/user/UserEditForm';
import { uploadImage } from '../utils/upload-image';

class UserService {
  async getOne(id: string) {
    const q = query(collection(db, 'users'), where('auth_id', '==', id));
    const docs = await getDocs(q);
    return docs.docs.map((doc) => doc.data())[0] as IUser;
  }

  async create(
    payload: any & { avatar: ImagePickerAsset | null },
    userType?: 'google' | 'default'
  ) {
    const q = query(collection(db, 'users'), where('email', '==', payload.email));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      const userRef = doc(collection(db, 'users'));
      const newUser = {
        id: userRef.id,
        auth_id: payload.uid,
        full_name: payload.displayName,
        avatar: null,
        email: payload.email,
      };

      if (payload.avatar && userType === 'default') {
        newUser['avatar'] = await uploadImage(payload.avatar);
      }

      if (payload.avatar && userType === 'google') {
        newUser['avatar'] = payload.avatar;
      }

      await setDoc(userRef, newUser);
    }
  }

  async update(id: string, payload: IUserEditFormValues) {
    const newUser = { ...payload };

    if (payload?.avatar && 'uri' in payload.avatar) {
      newUser['avatar'] = await uploadImage(payload.avatar);
    }

    await updateDoc(doc(db, 'users', id), { ...newUser });
  }
}

export default new UserService();
