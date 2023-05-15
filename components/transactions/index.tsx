import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

import { ITransaction } from '../../types/entities/Transaction';
import { TransactionItem } from './TransactionItem';
import { AddTransactionBlock } from './TransactionAddBlock';
import { Loader } from '../UI/Loader';

interface ITransactionsProps {
  transactions: ITransaction[];
  isLoading?: boolean;
  withoutCreate?: boolean;
}

const Transactions: FC<ITransactionsProps> = ({ transactions, isLoading, withoutCreate }) => {
  return (
    <View style={styles.transactionsBox}>
      <View style={styles.transactionsTop}>
        <Text style={styles.transactionsTitle}>Transactions</Text>

        {!withoutCreate && <AddTransactionBlock />}
      </View>

      {isLoading && <Loader />}

      {!isLoading && (
        <FlatList
          data={transactions}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  transactionsBox: {
    marginTop: 20,
    height: 300,
  },
  transactionsTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 21,
  },
  transactions: {},
});
