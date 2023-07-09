import { View, Text, StyleSheet } from 'react-native';

export const EmptyList = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  text: {
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    opacity: 0.3,
  },
});
