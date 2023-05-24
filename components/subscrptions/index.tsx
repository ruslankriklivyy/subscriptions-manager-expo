import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FC } from 'react';

import { ISubscription } from '../../types/entities/Subscription';
import { SubscriptionItem } from './SubscriptionItem';
import { Select } from '../UI/Select';
import { EmptyList } from '../UI/EmptyList';
import { Loader } from '../UI/Loader';

interface ISubscriptionsProps {
  items: ISubscription[];
  pagesOffset: number;
  orderBy: string;
  isLoading: boolean;
  onChangePageOffset: (pageOffset: number) => void;
  onChangeOrder: (order: string) => void;
}

const Subscriptions: FC<ISubscriptionsProps> = ({
  items,
  pagesOffset,
  orderBy,
  isLoading,
  onChangePageOffset,
  onChangeOrder,
}) => {
  const onHandleChangePageOffset = () => {
    if (pagesOffset > items?.length) return;
    onChangePageOffset(pagesOffset + 5);
  };

  const onHandleChangeOrder = (order: string) => onChangeOrder(order);

  return (
    <View style={styles.subscriptions}>
      <View style={styles.top}>
        <Text style={styles.title}>All Subscriptions</Text>

        <View style={styles.orderBy}>
          <Text style={styles.orderByTitle}>Order by:</Text>

          <Select
            onChange={onHandleChangeOrder}
            options={[
              { label: 'Date', value: 'created_at' },
              { label: 'Price', value: 'price' },
            ]}
            value={orderBy}
          />
        </View>
      </View>

      {items && (
        <FlatList
          data={items}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <SubscriptionItem subscription={item} />}
          ListEmptyComponent={!isLoading && EmptyList}
          ListFooterComponent={() =>
            isLoading &&
            !items && (
              <View style={styles.loaderFooter}>
                <Loader />
              </View>
            )
          }
          onEndReached={() => onHandleChangePageOffset()}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  subscriptions: {
    marginTop: 20,
    flex: 1,
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
  loaderFooter: {
    height: 90,
  },
  orderBy: {},
  orderByTitle: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 13,
    color: '#000',
    opacity: 0.5,
  },
});
