import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

import { ITransaction } from '../../types/entities/Transaction';
import { TransactionItem } from './TransactionItem';
import { AddTransactionBlock } from './TransactionAddBlock';
import { Loader } from '../UI/Loader';

interface ITransactionsProps {
  transactions: ITransaction[];
  pagesOffset: number;
  customStyles?: Record<string, string>;
  isLoading?: boolean;
  withoutCreate?: boolean;
  onChangePageOffset: (pagesOffset: number) => void;
}

const Transactions: FC<ITransactionsProps> = ({
  transactions,
  pagesOffset,
  isLoading,
  withoutCreate,
  customStyles,
  onChangePageOffset,
}) => {
  const onHandleChangePageOffset = () => {
    if (pagesOffset > transactions?.length) return;
    onChangePageOffset(pagesOffset + 5);
  };

  return (
    <View style={{ ...styles.transactionsBox, ...customStyles }}>
      <View style={styles.transactionsTop}>
        <Text style={styles.transactionsTitle}>Transactions</Text>

        {!withoutCreate && <AddTransactionBlock />}
      </View>

      <FlatList
        data={transactions}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
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
    height: '44%',
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
  loaderFooter: {
    height: 80,
  },
});
