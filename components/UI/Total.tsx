import { StyleSheet, View, Text } from 'react-native';
import { FC } from 'react';

interface ITotalProps {
  total: number;
}

export const Total: FC<ITotalProps> = ({ total }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Total</Text>
      <Text style={styles.total}>${total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    backgroundColor: '#EA7A53',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 18,
  },
  total: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 34,
  },
});
