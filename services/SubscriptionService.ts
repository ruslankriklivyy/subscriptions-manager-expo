import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  where,
  limit,
  orderBy,
  serverTimestamp,
} from '@firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';

import { db, storage } from '../config/firebase';
import { ICreateSubscriptionFormValues } from '../components/subscrptions/SubscriptionAddForm';
import { uploadImage } from '../utils/upload-image';

export interface IGetAllSubscriptionsProps {
  offset?: number;
  order?: string;
  userId: string;
}

class SubscriptionService {
  async getAll({ userId, offset, order }: IGetAllSubscriptionsProps) {
    const querySnapshot = query(
      collection(db, 'subscriptions'),
      orderBy(order, 'desc'),
      where('user_id', '==', userId),
      limit(offset ?? 0)
    );
    const docs = await getDocs(querySnapshot);
    return docs.docs.map((item) => {
      return item.data();
    });
  }

  async getOne(id: string) {
    const querySnapshot = query(collection(db, 'subscriptions'), where('id', '==', id));
    const docs = await getDocs(querySnapshot);
    return docs.docs.map((doc) => doc.data())[0];
  }

  async createOne(payload: ICreateSubscriptionFormValues) {
    const newSubscription: any = { ...payload, icon: null };
    const image = await uploadImage(payload.icon);

    if (image) {
      newSubscription['icon'] = image;
    }

    const subscriptionRef = doc(collection(db, 'subscriptions'));
    await setDoc(subscriptionRef, {
      ...newSubscription,
      created_at: serverTimestamp(),
      id: subscriptionRef.id,
    });

    return { ...newSubscription, id: subscriptionRef.id };
  }

  async deleteOne(id: string, iconUrl?: string) {
    if (iconUrl) {
      const previewRef = ref(storage, iconUrl);
      await deleteObject(previewRef);
    }

    const transactions = query(collection(db, 'transactions'), where('subscription_id', '==', id));
    const docs = await getDocs(transactions);

    docs.docs.map((item) => {
      return deleteDoc(item.ref);
    });

    await deleteDoc(doc(db, 'subscriptions', id));

    return null;
  }
}

export default new SubscriptionService();
