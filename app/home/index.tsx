import { StyleSheet, View } from 'react-native';

import { User } from '../../components/user';
import { SubscriptionAddBlock } from '../../components/subscrptions/SubscriptionAddBlock';
import { TotalCard } from '../../components/UI/TotalCard';
import Subscriptions from '../../components/subscrptions';

const Home = () => {
  return (
    <View style={styles.box}>
      <View style={styles.top}>
        <User fullName={'Ruslan'} />
        <SubscriptionAddBlock />
      </View>

      <View style={styles.content}>
        <TotalCard total={180} />

        <Subscriptions
          items={[
            {
              id: '1',
              name: 'Spotify',
              description: 'Some big description about subscription',
              price: '12',
              pay_date: '12.12.2023',
              pay_plan: 'Premium',
              color: '#F7D44C',
              icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png',
            },
          ]}
        />
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
    marginBottom: 20,
  },
  content: {},
});
