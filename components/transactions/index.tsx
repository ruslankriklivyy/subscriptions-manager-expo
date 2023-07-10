import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

import { ITransaction } from '../../types/entities/Transaction';
import { TransactionItem } from './TransactionItem';
import { Loader } from '../UI/Loader';
import { EmptyList } from '../UI/EmptyList';
import { AddButton } from '../UI/AddButton';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  const onHandleChangePageOffset = () => {
    if (pagesOffset > transactions?.length) return;
    onChangePageOffset(pagesOffset + 5);
  };

  return (
    <View style={styles.transactionsBox}>
      <View style={styles.transactionsTop}>
        <Text style={styles.transactionsTitle}>Transactions</Text>

        {!withoutCreate && (
          <AddButton
            onPress={() =>
              router.push({
                pathname: '/transactions/createTransaction',
              })
            }
          />
        )}
      </View>

      <FlatList
        data={transactions}
        contentContainerStyle={styles.transactions}
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
  transactions: {},
  loaderFooter: {
    height: 80,
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
