import { StyleSheet, SafeAreaView } from 'react-native';
import { useStore } from 'effector-react';

import { MainHeader } from '../components/UI/MainHeader';
import { UserEditForm } from '../components/user/UserEditForm';
import { $user } from '../stores/UserStore';

const Profile = () => {
  const user = useStore($user);
  const headerTitle = user?.full_name ? `Hello, ${user.full_name}!` : 'Hello!';

  return (
    <SafeAreaView style={styles.box}>
      <MainHeader title={headerTitle} />

      <UserEditForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});

export default Profile;
