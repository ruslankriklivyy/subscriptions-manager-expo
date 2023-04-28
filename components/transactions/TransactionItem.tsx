import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

import { ITransaction } from '../../types/entities/Transaction';

interface ITransactionItemProps {
  transaction: ITransaction;
}

export const TransactionItem: FC<ITransactionItemProps> = ({ transaction }) => {
  return (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionDate}>{transaction.date}</Text>
      <Text style={styles.transactionPrice}>${transaction.price}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  transactionItem: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'rgba(45, 222, 13, 0.2)',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#6dea4f',
  },
  transactionDate: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
  transactionPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
});
