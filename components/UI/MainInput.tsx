import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from 'react-native';
import { FC } from 'react';
import { MainLabel } from './MainLabel';

interface IMainInputProps {
  isError?: boolean;
  isImportant?: boolean;
  isSecureTextEntry?: boolean;
  isMultiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
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
  isMultiline = false,
  keyboardType = 'default',
  value,
  label,
  placeholder,
  onBlur,
  onChangeText,
}) => {
  let inputStyles: any = !isError ? styles.input : styles.inputError;

  if (isMultiline) {
    inputStyles = { ...inputStyles, textAlignVertical: 'top', height: 80 };
  }

  return (
    <>
      {label && <MainLabel label={label} isImportant={isImportant} />}

      <TextInput
        style={inputStyles}
        secureTextEntry={isSecureTextEntry}
        multiline={isMultiline}
        numberOfLines={isMultiline ? 4 : 1}
        keyboardType={keyboardType}
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
    height: 52,
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
});
