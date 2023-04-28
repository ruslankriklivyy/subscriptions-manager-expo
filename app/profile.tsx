import { StyleSheet, SafeAreaView } from 'react-native';

import { MainHeader } from '../components/UI/MainHeader';
import { UserEditForm } from '../components/user/UserEditForm';

const Profile = () => {
  return (
    <SafeAreaView style={styles.box}>
      <MainHeader title={'Hello, Ruslan!'} />

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
