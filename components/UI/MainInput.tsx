import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  Text,
  View,
} from 'react-native';
import { FC } from 'react';

interface IMainInputProps {
  isError?: boolean;
  isImportant?: boolean;
  isSecureTextEntry?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;

  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (value: string) => void;
}

export const MainInput: FC<IMainInputProps> = ({
  isError,
  isImportant,
  isSecureTextEntry,
  value,
  label,
  placeholder,
  onBlur,
  onChangeText,
}) => {
  return (
    <>
      {label && (
        <View style={styles.labelBox}>
          <Text style={styles.label}>{label}</Text>
          {isImportant && <Text>*</Text>}
        </View>
      )}

      <TextInput
        style={!isError ? styles.input : styles.inputError}
        secureTextEntry={isSecureTextEntry}
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#f3f3f3',
    borderStyle: 'solid',
    borderRadius: 8,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  inputError: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: 'red',
    borderStyle: 'solid',
    borderRadius: 8,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  labelBox: {
    flexDirection: 'row',
  },
  labelImportant: {},
});
