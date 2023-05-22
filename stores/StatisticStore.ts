import { createEffect, createStore } from 'effector';
import TransactionService from '../services/TransactionService';

export const countTotalExpenses = createEffect(async (userId: string) => {
  const transactions = await TransactionService.getAll({ userId });
  return transactions.reduce((acc, elem) => acc + Number(elem.price), 0);
});

export const $totalExpenses = createStore<number>(0).on(
  countTotalExpenses.doneData,
  (_, repos) => repos
);
