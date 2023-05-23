import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';

import { MainHeader } from '../../components/UI/MainHeader';
import { TotalCard } from '../../components/UI/TotalCard';
import Transactions from '../../components/transactions';
import { $totalExpenses, countTotalExpenses } from '../../stores/StatisticStore';
import {
  $totalExpensesByMonths,
  $transactions,
  countTotalExpensesByDate,
  deleteTransactionFx,
  fetchTransactionsFx,
} from '../../stores/TransactionStore';
import { Loader } from '../../components/UI/Loader';
import { MONTHS_ARR } from '../../config/consts';
import { $user } from '../../stores/UserStore';

const Total = () => {
  const user = useStore($user);
  const transactions = useStore($transactions);
  const totalExpenses = useStore($totalExpenses);
  const totalExpensesStatistic = useStore($totalExpensesByMonths);

  const isLoadingExpensesStatistic = useStore(countTotalExpensesByDate.pending);
  const isLoadingTransactions = useStore(fetchTransactionsFx.pending);

  const [pagesOffset, setPagesOffset] = useState(5);

  const onDeleteTransaction = async (id: string) => {
    await deleteTransactionFx(id);
    await fetchTransactionsFx({ offset: pagesOffset });
  };

  useEffect(() => {
    fetchTransactionsFx({ offset: pagesOffset });
  }, [pagesOffset]);

  useEffect(() => {
    countTotalExpensesByDate();
  }, []);

  useEffect(() => {
    user && countTotalExpenses(user.id);
  }, [user]);

  return (
    <SafeAreaView style={styles.box}>
      <MainHeader title={'Total'} />

      {isLoadingExpensesStatistic && <Loader />}

      {!isLoadingExpensesStatistic && totalExpensesStatistic?.length > 0 && (
        <>
          <ScrollView
            style={styles.lineChart}
            horizontal={true}
            contentOffset={{ x: 10000, y: 0 }}
            showsHorizontalScrollIndicator={false}
          >
            <LineChart
              bezier
              data={{
                labels: MONTHS_ARR,
                datasets: [
                  {
                    data: totalExpensesStatistic,
                  },
                ],
              }}
              width={800}
              height={240}
              yAxisLabel="$"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#f3f3f3',
                backgroundGradientFrom: '#f3f3f3',
                backgroundGradientTo: '#f3f3f3',
                decimalPlaces: 2,
                color: () => `#004EEC`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '5',
                  strokeWidth: '1',
                  stroke: '#004EEC',
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>

          <View style={styles.total}>
            <TotalCard total={totalExpenses} />
          </View>

          <Transactions
            withoutCreate
            pagesOffset={pagesOffset}
            isLoading={isLoadingTransactions}
            transactions={transactions}
            onChangePageOffset={setPagesOffset}
            onDeleteTransaction={onDeleteTransaction}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  lineChart: {
    flex: 1,
    height: 220,
  },
  total: {
    marginVertical: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Total;
