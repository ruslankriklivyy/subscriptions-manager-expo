import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

import { ITransaction } from '../../types/entities/Transaction';
import { TransactionItem } from './TransactionItem';
import { AddTransactionBlock } from './TransactionAddBlock';
import { Loader } from '../UI/Loader';
import { EmptyList } from '../UI/EmptyList';

interface ITransactionsProps {
  transactions: ITransaction[];
  pagesOffset: number;
  isLoading?: boolean;
  withoutCreate?: boolean;
  onChangePageOffset: (pagesOffset: number) => void;
  onDeleteTransaction: (id: string) => void;
}

const Transactions: FC<ITransactionsProps> = ({
  transactions,
  pagesOffset,
  isLoading,
  withoutCreate,
  onChangePageOffset,
  onDeleteTransaction,
}) => {
  const onHandleChangePageOffset = () => {
    if (pagesOffset > transactions?.length) return;
    onChangePageOffset(pagesOffset + 5);
  };

  return (
    <View style={styles.transactionsBox}>
      <View style={styles.transactionsTop}>
        <Text style={styles.transactionsTitle}>Transactions</Text>

        {!withoutCreate && <AddTransactionBlock />}
      </View>

      <FlatList
        data={transactions}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TransactionItem transaction={item} onDelete={onDeleteTransaction} />
        )}
        ListEmptyComponent={!isLoading && EmptyList}
        ListFooterComponent={() =>
          isLoading && (
            <View style={styles.loaderFooter}>
              <Loader />
            </View>
          )
        }
        onEndReached={() => onHandleChangePageOffset()}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  transactionsBox: {
    marginTop: 20,
    flex: 1,
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
  loaderFooter: {
    height: 80,
  },
});
