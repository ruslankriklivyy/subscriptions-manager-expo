import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@firebase/firestore';

import { db } from '../config/firebase';
import { ICreateTransactionFormValues } from '../components/transactions/TransactionAddForm';

export interface IGetAllTransactionProps {
  subscriptionId?: string | null;
}

class TransactionService {
  async getAll({ subscriptionId }: IGetAllTransactionProps) {
    let querySnapshot = query(collection(db, 'transactions'));

    if (subscriptionId) {
      querySnapshot = query(
        collection(db, 'transactions'),
        where('subscription_id', '==', subscriptionId)
      );
    }

    const docs = await getDocs(querySnapshot);
    return docs.docs.map((item) => {
      return item.data();
    });
  }

  async getOne(id: string) {
    const querySnapshot = query(collection(db, 'transactions'), where('id', '==', id));
    const docs = await getDocs(querySnapshot);
    return docs.docs.map((doc) => doc.data())[0];
  }

  async createOne(payload: ICreateTransactionFormValues) {
    const transactionRef = doc(collection(db, 'transactions'));
    await setDoc(transactionRef, {
      ...payload,
      created_at: serverTimestamp(),
      id: transactionRef.id,
    });

    return { ...payload, id: transactionRef.id };
  }

  deleteOne(id: string) {
    return deleteDoc(doc(db, 'transactions', id));
  }
}

export default new TransactionService();
