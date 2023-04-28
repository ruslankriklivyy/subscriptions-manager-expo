import { StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { FC } from 'react';

interface IAddButtonProps {
  onPress: () => void;
}

export const AddButton: FC<IAddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.addBtn} onPress={onPress}>
      <EvilIcons name="plus" size={50} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: 50,
    height: 40,
  },
});
