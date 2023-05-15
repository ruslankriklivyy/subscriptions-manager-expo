import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export interface ITransactionDateStatistic {
  month_index: number;
  year: number;
}

export interface ITransaction {
  id: string;
  date: Timestamp;
  date_statistic: ITransactionDateStatistic | null;
  price: number;
}
