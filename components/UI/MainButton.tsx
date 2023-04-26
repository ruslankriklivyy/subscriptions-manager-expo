import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { FC } from 'react';

type ButtonTypes = 'main' | 'outlined';

interface IMainButtonProps {
  title: string;
  type?: ButtonTypes;
  backgroundColor?: string;
  Icon?: any;

  onPress: () => void;
}

export const MainButton: FC<IMainButtonProps> = ({
  title,
  Icon,
  type = 'main',
  backgroundColor,
  onPress,
}) => {
  if (type === 'main') {
    return (
      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: backgroundColor ?? '#000' }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    );
  }

  if (type === 'outlined') {
    return (
      <TouchableOpacity
        style={{ ...styles.btnOutlined, backgroundColor }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {Icon && <View style={styles.btnIcon}>{Icon}</View>}
        <Text style={styles.btnTitleOutlined}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  btnOutlined: {
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#F3F3F3',
    borderStyle: 'solid',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnTitle: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  btnTitleOutlined: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  btnIcon: {
    marginRight: 10,
  },
});
