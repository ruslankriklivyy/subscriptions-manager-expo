import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FC } from 'react';

import { ISelectOption } from '../../types/common/ISelectOption';

interface ISelectProps {
  value?: string;
  options: ISelectOption[];
  onChange: (value: string) => void;
}

export const Select: FC<ISelectProps> = ({ value, options, onChange }) => {
  return (
    <View style={styles.box}>
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: 130,
  },
  pickerItem: {
    fontFamily: 'Poppins-Regular',
    height: 34,
  },
  box: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#eae5e5',
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
