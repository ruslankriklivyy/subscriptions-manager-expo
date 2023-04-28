import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FC } from 'react';

import { MainButton } from '../UI/MainButton';
import { ISubscription } from '../../types/entities/Subscription';

interface IExpandedSubscriptionItemProps {
  isView?: boolean;
  subscription: ISubscription;
  onPress?: () => void;
}

export const ExpandedSubscriptionItem: FC<IExpandedSubscriptionItemProps> = ({
  isView = false,
  subscription,
  onPress,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        ...styles.expandedSubscriptionItem,
        backgroundColor: subscription.color,
        borderColor: subscription.color,
      }}
      onPress={onPress}
    >
      <View style={styles.expandedSubscriptionItemTop}>
        <View style={styles.expandedSubscriptionItemLeft}>
          <Image source={{ uri: subscription.icon }} style={styles.expandedSubscriptionItemIcon} />

          <View style={styles.expandedSubscriptionItemInfo}>
            <Text style={styles.subscriptionItemName}>{subscription.name}</Text>
            <Text style={styles.expandedSubscriptionItemPayPlan}>{subscription.pay_plan}</Text>
          </View>
        </View>

        <View style={styles.expandedSubscriptionItemRight}>
          <Text style={styles.subscriptionItemPrice}>${subscription.price}</Text>
        </View>
      </View>

      <View style={styles.expandedSubscriptionItemContent}>
        <View style={styles.expandedSubscriptionItemField}>
          <Text style={styles.expandedSubscriptionItemFieldName}>Description</Text>

          <Text style={styles.expandedSubscriptionItemFieldValue}>{subscription.description}</Text>
        </View>

        <View style={styles.expandedSubscriptionItemField}>
          <Text style={styles.expandedSubscriptionItemFieldName}>Pay date</Text>

          <Text style={styles.expandedSubscriptionItemFieldValue}>{subscription.pay_date}</Text>
        </View>
      </View>

      <View style={styles.expandedSubscriptionItemBottom}>
        <View style={styles.viewSubscriptionDetails}>
          {isView ? (
            <MainButton
              title={'View details'}
              onPress={() =>
                router.push({
                  pathname: '/subscriptions/subscription',
                  params: { id: subscription.id },
                })
              }
            />
          ) : (
            <MainButton
              title={'Edit'}
              onPress={() =>
                router.push({
                  pathname: '/subscriptions/subscription',
                  params: { id: subscription.id },
                })
              }
            />
          )}
        </View>

        <Pressable style={styles.removeSubscription}>
          <MaterialIcons name="delete" size={27} color="white" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  expandedSubscriptionItem: {
    padding: 20,
    borderRadius: 8,
  },
  expandedSubscriptionItemTop: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expandedSubscriptionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandedSubscriptionItemIcon: {
    width: 38,
    height: 38,
    marginRight: 12,
  },
  expandedSubscriptionItemInfo: {},
  expandedSubscriptionItemPayPlan: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  expandedSubscriptionItemRight: {},
  expandedSubscriptionItemContent: {},
  expandedSubscriptionItemField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  expandedSubscriptionItemFieldName: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    width: '30%',
    opacity: 0.6,
  },
  expandedSubscriptionItemFieldValue: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    width: '60%',
  },
  expandedSubscriptionItemBottom: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewSubscriptionDetails: {
    width: '78%',
  },
  removeSubscription: {
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  subscriptionItemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
  },
  subscriptionItemName: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
  },
});
