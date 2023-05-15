import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FC } from 'react';

interface ILoaderProps {
  size?: number | 'small' | 'large' | undefined;
  color?: string;
}

export const Loader: FC<ILoaderProps> = ({ size = 'large', color = '#000' }) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});
