import { StyleSheet, View } from 'react-native';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';

import { User } from '../../components/user';
import { SubscriptionAddBlock } from '../../components/subscrptions/SubscriptionAddBlock';
import { TotalCard } from '../../components/UI/TotalCard';
import Subscriptions from '../../components/subscrptions';
import { $user } from '../../stores/UserStore';
import { $subscriptions, fetchSubscriptionsFx } from '../../stores/SubscriptionStore';
import { Loader } from '../../components/UI/Loader';
import { $totalExpenses, countTotalExpenses } from '../../stores/StatisticStore';

const Home = () => {
  const [pagesOffset, setPagesOffset] = useState<number>(0);

  const user = useStore($user);
  const subscriptions = useStore($subscriptions);
  const totalExpenses = useStore($totalExpenses);
  const isSubscriptionsLoading = useStore(fetchSubscriptionsFx.pending);

  useEffect(() => {
    user && fetchSubscriptionsFx({ userId: user.id, offset: pagesOffset, perPage: 4 });
  }, [user, pagesOffset]);

  useEffect(() => {
    countTotalExpenses();
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <View style={styles.box}>
      <View style={styles.top}>
        <User avatarUrl={user?.avatar?.url} fullName={user?.full_name || user?.email} />
        <SubscriptionAddBlock />
      </View>

      <TotalCard total={totalExpenses} />

      <Subscriptions items={subscriptions} isLoading={isSubscriptionsLoading} />
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
});
