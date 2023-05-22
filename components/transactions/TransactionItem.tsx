import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FC } from 'react';
import { SwipeRow } from 'react-native-swipe-list-view';
import { MaterialIcons } from '@expo/vector-icons';

import { ITransaction } from '../../types/entities/Transaction';
import { formatDate } from '../../utils/format-date';

interface ITransactionItemProps {
  transaction: ITransaction;
  onDelete: (id: string) => void;
}

export const TransactionItem: FC<ITransactionItemProps> = ({ transaction, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.transaction}>
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore

          <SwipeRow disableRightSwipe rightOpenValue={-75}>
            <View style={styles.transactionRowBack}>
              <View style={styles.transactionDelete}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.transactionDeleteBtn}
                  onPress={() => onDelete(transaction.id)}
                >
                  <MaterialIcons name="delete" size={28} color="red" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.transactionRowFront}>
              <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
              <Text style={styles.transactionPrice}>${transaction.price}</Text>
            </View>
          </SwipeRow>
        }
      </View>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    zIndex: 5,
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

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  transaction: {
    marginBottom: 20,
  },
  transactionRowFront: {
    alignItems: 'center',
    backgroundColor: '#ebefea',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    height: 65,
    borderRadius: 8,
  },
  transactionRowBack: {
    backgroundColor: '#e8e0e0',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  transactionDelete: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  transactionDeleteBtn: {
    width: 40,
    height: 40,
  },
});
