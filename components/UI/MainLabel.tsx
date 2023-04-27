import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

interface IMainLabelProps {
  label?: string;
  isImportant?: boolean;
}

export const MainLabel: FC<IMainLabelProps> = ({ label, isImportant = false }) => (
  <View style={styles.labelBox}>
    <Text style={styles.label}>{label}</Text>
    {isImportant && <Text>*</Text>}
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  labelBox: {
    flexDirection: 'row',
  },
  labelImportant: {},
});
