import { StyleSheet, View, Text, Pressable } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState, FC } from 'react';

import { MainLabel } from './MainLabel';

interface IDatePickerProps {
  onChange: (value: Date) => void;
  value: Date;
  label?: string;
  isImportant?: boolean;
}

export const DatePicker: FC<IDatePickerProps> = ({
  value,
  label,
  isImportant = false,
  onChange,
}) => {
  const [date, setDate] = useState(value);

  const onChangeDate = (event, selectedDate) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      {label && <MainLabel label={label} isImportant={isImportant} />}

      <Pressable style={styles.date} onPress={showDatepicker}>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#f3f3f3',
    borderStyle: 'solid',
    borderRadius: 8,
    height: 52,
    justifyContent: 'flex-start',
  },
  dateText: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    marginTop: 2,
  },
});
