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
  const user = useStore($user);
  const subscriptions = useStore($subscriptions);
  const totalExpenses = useStore($totalExpenses);
  const isSubscriptionsLoading = useStore(fetchSubscriptionsFx.pending);

  const [orderBy, setOrderBy] = useState('created_at');
  const [pagesOffset, setPagesOffset] = useState(5);

  useEffect(() => {
    user && fetchSubscriptionsFx({ userId: user.id, offset: pagesOffset, order: orderBy });
  }, [user, pagesOffset, orderBy]);

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

      <Subscriptions
        isLoading={isSubscriptionsLoading}
        pagesOffset={pagesOffset}
        orderBy={orderBy}
        items={subscriptions}
        onChangePageOffset={setPagesOffset}
        onChangeOrder={setOrderBy}
      />
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
