import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { useRouter } from 'expo-router';

interface ITotalProps {
  total: number;
}

export const TotalCard: FC<ITotalProps> = ({ total }) => {
  const router = useRouter();

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.box} onPress={() => router.push('/total')}>
      <Text style={styles.title}>Total expenses</Text>
      <Text style={styles.total}>-${total}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    backgroundColor: '#004EEC',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
  },
  total: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 34,
    color: '#fff',
  },
});
