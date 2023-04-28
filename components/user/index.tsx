import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { useRouter } from 'expo-router';

interface IUserProps {
  fullName: string;
  avatarUrl?: string;
}

export const User: FC<IUserProps> = ({ fullName, avatarUrl }) => {
  const router = useRouter();
  const userAvatarSource = avatarUrl ? { uri: avatarUrl } : require('../../assets/avatar.png');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.user}
      onPress={() => router.push('/profile')}
    >
      <Image style={styles.userAvatar} source={userAvatarSource} />

      <Text style={styles.userFullName}>{fullName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 34,
    height: 34,
    marginRight: 5,
    borderRadius: 100,
  },
  userFullName: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
});
