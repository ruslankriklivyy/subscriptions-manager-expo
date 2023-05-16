import { createEffect, createEvent, createStore } from 'effector';
import { collection, getDocs, query, where } from '@firebase/firestore';
import moment from 'moment';

import TransactionService, { IGetAllTransactionProps } from '../services/TransactionService';
import { ICreateTransactionFormValues } from '../components/transactions/TransactionAddForm';
import { ITransaction } from '../types/entities/Transaction';
import { db } from '../config/firebase';
import { MONTHS_ARR } from '../config/consts';

export const fetchTransactionsFx = createEffect(async (payload: IGetAllTransactionProps) => {
  return await TransactionService.getAll(payload);
});
export const fetchTransactionFx = createEffect(async (id: string) => {
  return await TransactionService.getOne(id);
});
export const createTransactionFx = createEffect(async (payload: ICreateTransactionFormValues) => {
  return await TransactionService.createOne(payload);
});
export const deleteTransactionFx = createEffect(async (id: string) => {
  return await TransactionService.deleteOne(id);
});
export const countTotalExpensesByDate = createEffect(async () => {
  const currentDate = moment();
  const statisticDates = MONTHS_ARR.map((_, i) => ({ month_index: i, year: currentDate.year() }));
  const result: number[] = [];

  for (const statisticDate of statisticDates) {
    const querySnapshot = query(
      collection(db, 'transactions'),
      where('date_statistic.month_index', '==', statisticDate.month_index),
      where('date_statistic.year', '==', statisticDate.year)
    );
    const docs = await getDocs(querySnapshot);
    const transactions = docs.docs.map((item) => {
      return item.data();
    });
    const total = transactions?.reduce((acc, elem) => acc + Number(elem.price), 0);
    result.push(total);
  }

  return result;
});

export const countTotalExpenses = createEvent<ITransaction[]>();

export const $transactions = createStore(null).on(
  fetchTransactionsFx.doneData,
  (_, repos) => repos
);
export const $transaction = createStore(null).on(fetchTransactionFx.doneData, (_, repos) => repos);
export const $totalExpenses = createStore(0).on(countTotalExpenses, (state, payload) => {
  return payload.reduce((acc, elem) => acc + Number(elem.price), 0);
});
export const $totalExpensesByMonths = createStore([]).on(
  countTotalExpensesByDate.doneData,
  (_, repos) => repos
);
