import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { FC, ReactNode } from 'react';

type ButtonTypes = 'main' | 'outlined';

interface IMainButtonProps {
  title: string;
  type?: ButtonTypes;
  backgroundColor?: string;
  textColor?: string;
  Icon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;

  onPress: () => void;
}

export const MainButton: FC<IMainButtonProps> = ({
  title,
  Icon,
  type = 'main',
  backgroundColor,
  textColor,
  disabled = false,
  isLoading = false,
  onPress,
}) => {
  if (type === 'main') {
    return (
      <TouchableOpacity
        disabled={disabled || isLoading}
        style={{ ...styles.btn, backgroundColor: backgroundColor ?? '#000' }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {isLoading && backgroundColor && (
          <Image style={styles.loadingGif} source={require('../../assets/icons/loading.gif')} />
        )}
        {isLoading && !backgroundColor && (
          <Image
            style={styles.loadingGif}
            source={require('../../assets/icons/loading-white.gif')}
          />
        )}
        {!isLoading && (
          <Text style={{ ...styles.btnTitle, color: textColor ?? '#fff' }}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  if (type === 'outlined') {
    return (
      <TouchableOpacity
        disabled={disabled || isLoading}
        style={{ ...styles.btnOutlined, backgroundColor }}
        activeOpacity={0.8}
        onPress={onPress}
      >
        {Icon && <View style={styles.btnIcon}>{Icon}</View>}
        <Text style={{ ...styles.btnTitleOutlined, color: textColor ?? '#000' }}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
  loadingGif: {
    width: 34,
    height: 34,
  },
});
