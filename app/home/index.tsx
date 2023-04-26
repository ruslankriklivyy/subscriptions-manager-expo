import { StyleSheet, View } from 'react-native';

import { User } from '../../components/user';
import { AddBlock } from '../../components/subscrptions/AddBlock';

const Home = () => {
  return (
    <View style={styles.box}>
      <View style={styles.top}>
        <User fullName={'Test User'} />
        <AddBlock />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
