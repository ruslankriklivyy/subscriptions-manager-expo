import { StyleSheet, View, Text } from 'react-native';
import { FC } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MainButton } from './MainButton';

interface IInfoProps {
  type: 'success' | 'failure';
  title?: string;
  description?: string;
  onAction: () => void;
}

export const Info: FC<IInfoProps> = ({ type, title, description, onAction }) => {
  return (
    <View style={styles.box}>
      {type === 'failure' && <MaterialIcons name="error" size={24} color="red" />}
      {type === 'success' && (
        <MaterialCommunityIcons name="robot-happy" size={74} color="#58c70b" />
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.actions}>
        <MainButton title={'Ok'} onPress={() => onAction()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 34,
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 30,
  },
  actions: {
    width: 200,
  },
});
