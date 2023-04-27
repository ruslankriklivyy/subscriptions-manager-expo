import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { FC } from 'react';

import { ISubscription } from '../../types/entities/Subscription';
import { SubscriptionItem } from './SubscriptionItem';
import { Select } from '../UI/Select';

interface ISubscriptionsProps {
  items: ISubscription[];
}

const Subscriptions: FC<ISubscriptionsProps> = ({ items }) => {
  return (
    <View style={styles.subscriptions}>
      <View style={styles.top}>
        <Text style={styles.title}>All Subscriptions</Text>

        <Select onChange={() => null} value={'Java'} />
      </View>

      <SafeAreaView style={styles.content}>
        <FlatList
          data={items}
          renderItem={({ item }) => <SubscriptionItem subscription={item} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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
  content: {},
});
