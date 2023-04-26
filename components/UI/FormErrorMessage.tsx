import { StyleSheet, Text } from 'react-native';
import { FC } from 'react';

interface IFormErrorMessageProps {
  errorMessage?: string;
}

export const FormErrorMessage: FC<IFormErrorMessageProps> = ({ errorMessage }) => {
  return <Text style={styles.errorMessage}>{errorMessage}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'red',
  },
});
