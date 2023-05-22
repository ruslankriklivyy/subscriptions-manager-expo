import { StyleSheet, View, Text } from 'react-native';
import { FC } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { MainButton } from './MainButton';

interface IResultBlock {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

export const ResultBlock: FC<IResultBlock> = ({ message, type, onClose }) => {
  return (
    <View style={styles.box}>
      {type === 'error' && <MaterialIcons name="error" size={84} color="red" />}
      {type === 'success' && <AntDesign name="checkcircle" size={84} color="green" />}

      <Text style={styles.message}>{message}</Text>

      <View style={styles.actions}>
        <MainButton title={'Ok'} onPress={() => onClose()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 30,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
  },
  actions: {
    width: 200,
    marginTop: 20,
  },
});
