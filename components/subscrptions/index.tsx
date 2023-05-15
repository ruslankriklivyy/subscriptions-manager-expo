import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FC } from 'react';

import { ISubscription } from '../../types/entities/Subscription';
import { SubscriptionItem } from './SubscriptionItem';
import { Select } from '../UI/Select';
import { EmptySubscriptions } from './EmptySubscriptions';
import { Loader } from '../UI/Loader';

interface ISubscriptionsProps {
  items: ISubscription[];
  isLoading: boolean;
}

const Subscriptions: FC<ISubscriptionsProps> = ({ items, isLoading }) => {
  return (
    <View style={styles.subscriptions}>
      <View style={styles.top}>
        <Text style={styles.title}>All Subscriptions</Text>

        <Select onChange={() => null} value={'Java'} />
      </View>

      <View style={styles.contentContainer}>
        {isLoading && <Loader />}

        {!isLoading && (
          <FlatList
            data={items}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <SubscriptionItem subscription={item} />}
            ListEmptyComponent={EmptySubscriptions}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  subscriptions: {
    marginTop: 20,
  },
  top: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 18,
  },
  contentContainer: {
    height: '78%',
  },
});
