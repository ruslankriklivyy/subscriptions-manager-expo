import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { FC, useEffect } from 'react';

import { ITransaction } from '../../types/entities/Transaction';
import { TransactionItem } from './TransactionItem';
import { AddTransactionBlock } from './TransactionAddBlock';
import { Loader } from '../UI/Loader';
import { EmptyList } from '../UI/EmptyList';
import { deleteTransactionFx } from '../../stores/TransactionStore';

interface ITransactionsProps {
  transactions: ITransaction[];
  pagesOffset: number;
  customStyles?: Record<string, string>;
  isLoading?: boolean;
  withoutCreate?: boolean;
  onChangePageOffset: (pagesOffset: number) => void;
  onDeleteTransaction: (id: string) => void;
}

const rowTranslateAnimatedValues = {};

const Transactions: FC<ITransactionsProps> = ({
  transactions,
  pagesOffset,
  isLoading,
  withoutCreate,
  customStyles,
  onChangePageOffset,
  onDeleteTransaction,
}) => {
  const onHandleChangePageOffset = () => {
    if (pagesOffset > transactions?.length) return;
    onChangePageOffset(pagesOffset + 5);
  };

  useEffect(() => {
    if (transactions && transactions?.length) {
      transactions.forEach((transaction) => {
        rowTranslateAnimatedValues[`${transaction.id}`] = new Animated.Value(1);
      });
    }
  }, [transactions]);

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
        renderItem={({ item }) => (
          <TransactionItem transaction={item} onDelete={onDeleteTransaction} />
        )}
        ListEmptyComponent={!isLoading && EmptyList}
        ListFooterComponent={() =>
          isLoading &&
          !transactions && (
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

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    height: 73,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 8,
    zIndex: 0,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderRadius: 8,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
