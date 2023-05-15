import { Modal, Pressable, StyleSheet, Text } from 'react-native';
import { FC, useState } from 'react';
import { ColorPicker } from 'react-native-color-picker';

import { MainLabel } from './MainLabel';

interface IControlColorProps {
  onChange: (value: string) => void;
  value: string;
  label?: string;
  isImportant?: boolean;
}

export const ControlColor: FC<IControlColorProps> = ({ value, label, isImportant, onChange }) => {
  const [isShowPicker, setIsShowPicker] = useState(false);

  return (
    <>
      {label && <MainLabel label={label} isImportant={isImportant} />}

      <Pressable style={styles.pick} onPress={() => setIsShowPicker(true)}>
        {value.length ? (
          <Text style={styles.pickValue}>{value}</Text>
        ) : (
          <Text style={styles.pickPlaceholder}>Pick subscription color</Text>
        )}
      </Pressable>

      <Modal
        style={styles.colorPicker}
        animationType="slide"
        transparent={true}
        visible={isShowPicker}
        onRequestClose={() => setIsShowPicker(!isShowPicker)}
      >
        <ColorPicker
          onColorSelected={(value) => {
            onChange(value);
            setIsShowPicker(false);
          }}
          style={styles.colorPicker}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  pick: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#f3f3f3',
    borderStyle: 'solid',
    borderRadius: 8,
    height: 52,
    justifyContent: 'flex-start',
  },
  pickValue: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    marginTop: 2,
  },
  pickPlaceholder: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    marginTop: 2,
    opacity: 0.4,
  },
  box: {},
  colorPicker: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
