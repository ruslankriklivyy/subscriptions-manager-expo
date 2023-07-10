import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useSearchParams } from 'expo-router';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { MainHeader } from '../../components/UI/MainHeader';
import { ExpandedSubscriptionItem } from '../../components/subscrptions/ExpandedSubscriptionItem';
import Transactions from '../../components/transactions';
import { $subscription, fetchSubscriptionFx } from '../../stores/SubscriptionStore';
import { Loader } from '../../components/UI/Loader';
import {
  $totalExpenses,
  $transactions,
  countTotalExpenses,
  deleteTransactionFx,
  fetchTransactionsFx,
} from '../../stores/TransactionStore';
import { FORMAT_DATE_PARSE } from '../../config/consts';

const Subscription = () => {
  const totalExpenses = useStore($totalExpenses);
  const transactions = useStore($transactions);
  const subscription = useStore($subscription);
  const isSubscriptionsLoading = useStore(fetchSubscriptionFx.pending);
  const isTransactionsLoading = useStore(fetchTransactionsFx.pending);
  const searchParams = useSearchParams();

  const nowDate = moment().format(FORMAT_DATE_PARSE);
  const subscriptionId = searchParams?.id as string;

  const [pagesOffset, setPagesOffset] = useState(5);

  const onDeleteTransaction = async (id: string) => {
    await deleteTransactionFx(id);
    await fetchTransactionsFx({ subscriptionId, offset: pagesOffset });
  };

  useEffect(() => {
    fetchSubscriptionFx(subscriptionId);
  }, [subscriptionId]);

  useEffect(() => {
    fetchTransactionsFx({ subscriptionId, offset: pagesOffset });
  }, [subscriptionId, pagesOffset]);

  useEffect(() => {
    transactions && countTotalExpenses(transactions);
  }, [transactions]);

  return (
    <SafeAreaView style={styles.box}>
      {isSubscriptionsLoading && <Loader />}

      {!isSubscriptionsLoading && subscription && (
        <>
          <MainHeader title={'Subscription'} />

          {subscription && <ExpandedSubscriptionItem subscription={subscription} />}

          <View style={styles.expenses}>
            <View>
              <Text style={styles.expensesTitle}>Expenses</Text>

              <Text style={styles.expensesDate}>{nowDate}</Text>
            </View>

            <Text style={styles.expensesTotal}>-${totalExpenses}</Text>
          </View>

          <View style={styles.transactions}>
            <Transactions
              pagesOffset={pagesOffset}
              isLoading={isTransactionsLoading}
              transactions={transactions}
              onChangePageOffset={setPagesOffset}
              onDeleteTransaction={onDeleteTransaction}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  box: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  expenses: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#f3f3f3',
  },
  expensesTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
  expensesDate: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    opacity: 0.5,
  },
  expensesTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
  transactions: {
    flex: 1,
    marginTop: 20,
  },
});
