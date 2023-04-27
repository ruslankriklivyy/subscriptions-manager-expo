import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FC } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface IMainHeaderProps {
  title?: string;
  onBack?: () => void;
}

export const MainHeader: FC<IMainHeaderProps> = ({ title, onBack }) => {
  const router = useRouter();

  const onPressBack = () => (onBack ? onBack() : router.back());

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7} style={styles.back} onPress={onPressBack}>
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    top: 5,
    left: 0,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 21,
  },
});
