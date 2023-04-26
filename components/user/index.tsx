import { StyleSheet, View, Image, Text } from 'react-native';
import { FC } from 'react';

interface IUserProps {
  fullName: string;
  avatarUrl?: string;
}

export const User: FC<IUserProps> = ({ fullName, avatarUrl }) => {
  const userAvatarSource = avatarUrl ? { uri: avatarUrl } : require('../../assets/avatar.png');

  return (
    <View style={styles.user}>
      <Image style={styles.userAvatar} source={userAvatarSource} />

      <Text style={styles.userFullName}>{fullName}</Text>
    </View>
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
