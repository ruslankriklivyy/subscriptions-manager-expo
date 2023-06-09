import { StyleSheet, View } from 'react-native';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'expo-router';

import { User } from '../../components/user';
import { TotalCard } from '../../components/UI/TotalCard';
import Subscriptions from '../../components/subscrptions';
import { $user, setUser } from '../../stores/UserStore';
import { $subscriptions, fetchSubscriptionsFx } from '../../stores/SubscriptionStore';
import { Loader } from '../../components/UI/Loader';
import { $totalExpenses, countTotalExpenses } from '../../stores/StatisticStore';
import UserService from '../../services/UserService';
import { auth } from '../../config/firebase';
import { AddButton } from '../../components/UI/AddButton';

const Home = () => {
  const [user] = useAuthState(auth);
  const userStore = useStore($user);
  const subscriptions = useStore($subscriptions);
  const totalExpenses = useStore($totalExpenses);
  const isSubscriptionsLoading = useStore(fetchSubscriptionsFx.pending);
  const router = useRouter();

  const [orderBy, setOrderBy] = useState('created_at');
  const [pagesOffset, setPagesOffset] = useState(5);

  useEffect(() => {
    userStore &&
      fetchSubscriptionsFx({ userId: userStore.id, offset: pagesOffset, order: orderBy });
  }, [userStore, pagesOffset, orderBy]);

  useEffect(() => {
    userStore && countTotalExpenses(userStore.id);
  }, [userStore]);

  useEffect(() => {
    if (user) {
      UserService.getOne(user.uid).then((res) => {
        res && setUser(res);
      });
    }
  }, [user]);

  if (!user) {
    return <Loader />;
  }

  return (
    <View style={styles.box}>
      <View style={styles.top}>
        <User avatarUrl={userStore?.avatar?.url} fullName={userStore?.full_name || user?.email} />
        <AddButton
          onPress={() =>
            router.push({
              pathname: '/subscriptions/createSubscription',
            })
          }
        />
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
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
