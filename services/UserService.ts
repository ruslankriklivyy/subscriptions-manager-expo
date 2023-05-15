import { query, collection, getDocs, setDoc, updateDoc, where, doc } from '@firebase/firestore';
import { User } from '@firebase/auth';

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

  async create(payload: User) {
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

      await setDoc(userRef, newUser);
    }
  }

  async update(id: string, payload: IUserEditFormValues) {
    const newUser: any = { ...payload };
    const image = await uploadImage(payload.avatar);

    if (image) {
      newUser['avatar'] = image;
    }

    await updateDoc(doc(db, 'users', id), { ...newUser });
  }
}

export default new UserService();
