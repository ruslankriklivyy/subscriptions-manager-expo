import { query, collection, getDocs, setDoc, updateDoc, where, doc } from '@firebase/firestore';
import { User } from '@firebase/auth';

import { db } from '../config/firebase';
import { IUser } from '../types/entities/User';
import { IUserEditFormValues } from '../components/user/UserEditForm';
import { uploadImage } from '../utils/upload-image';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';
import { IFirebaseImage } from '../types/common/IFirebaseImage';

class UserService {
  async getOne(id: string) {
    const q = query(collection(db, 'users'), where('auth_id', '==', id));
    const docs = await getDocs(q);
    return docs.docs.map((doc) => doc.data())[0] as IUser;
  }

  async create(payload: User & { avatar: ImagePickerAsset | null }) {
    const q = query(collection(db, 'users'), where('id', '==', payload.uid));
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

      if (payload.avatar) {
        newUser['avatar'] = await uploadImage(payload.avatar);
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
