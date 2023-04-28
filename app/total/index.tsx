import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { MainHeader } from '../../components/UI/MainHeader';
import { TotalCard } from '../../components/UI/TotalCard';
import Transactions from '../../components/transactions';

const Total = () => {
  return (
    <SafeAreaView style={styles.box}>
      <MainHeader title={'Total'} />

      <View style={styles.content}>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel="$"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#f3f3f3',
            backgroundGradientFrom: '#f3f3f3',
            backgroundGradientTo: '#f3f3f3',
            decimalPlaces: 2, // optional, defaults to 2dp
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
          bezier
          style={{
            marginBottom: 30,
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <TotalCard total={12} />

        <Transactions withoutCreate transactions={[{ id: '1', date: '12.12.2023', price: 34 }]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  content: {},
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Total;
