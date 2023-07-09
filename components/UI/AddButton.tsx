import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';

interface IAddButtonProps {
  onPress: () => void;
}

export const AddButton: FC<IAddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.addBtn} onPress={onPress}>
      <Image style={styles.addBtnIcon} source={require('../../assets/icons/plus.png')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: '#FFCA44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnIcon: {
    width: 27,
    height: 27,
  },
});
