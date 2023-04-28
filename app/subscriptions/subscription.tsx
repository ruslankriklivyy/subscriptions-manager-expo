import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useSearchParams } from 'expo-router';

import { MainHeader } from '../../components/UI/MainHeader';
import { ExpandedSubscriptionItem } from '../../components/subscrptions/ExpandedSubscriptionItem';
import Transactions from '../../components/transactions';

const Subscription = () => {
  const searchParams = useSearchParams();

  return (
    <SafeAreaView style={styles.box}>
      <MainHeader title={'Subscription'} />

      <View style={styles.content}>
        <ExpandedSubscriptionItem
          subscription={{
            id: '1',
            name: 'Spotify',
            description: 'Some big description about subscription',
            price: '12',
            pay_date: '12.12.2023',
            pay_plan: 'Premium',
            color: '#F7D44C',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png',
          }}
        />

        <View style={styles.expenses}>
          <View style={styles.expensesLeft}>
            <Text style={styles.expensesTitle}>Expenses</Text>

            <Text style={styles.expensesDate}>12.12.2023</Text>
          </View>

          <View style={styles.expensesRight}>
            <Text style={styles.expensesTotal}>-$1240.40</Text>
          </View>
        </View>

        <Transactions transactions={[{ id: '1', date: '12.12.2023', price: 12 }]} />
      </View>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  box: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
  },
  content: {},
  expenses: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#f3f3f3',
  },
  expensesLeft: {},
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
  expensesRight: {},
  expensesTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
});
