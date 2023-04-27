import {
  Image,
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { FC, useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { ISubscription } from '../../types/entities/Subscription';
import { MainButton } from '../UI/MainButton';

interface ISubscriptionItemProps {
  subscription: ISubscription;
}

export const SubscriptionItem: FC<ISubscriptionItemProps> = ({ subscription }) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const onPress = () => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 200,
    });
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {!isExpanded && (
        <TouchableOpacity activeOpacity={0.7} style={styles.subscriptionItem} onPress={onPress}>
          <View style={styles.subscriptionItemLeft}>
            <View style={styles.subscriptionItemIconBox}>
              <Image
                style={styles.subscriptionItemIcon}
                source={{
                  uri: subscription.icon,
                }}
              />
            </View>

            <View style={styles.subscriptionItemInfo}>
              <Text style={styles.subscriptionItemName}>{subscription.name}</Text>
              <Text style={styles.subscriptionItemPayDate}>{subscription.pay_date}</Text>
            </View>
          </View>

          <View style={styles.subscriptionItemRight}>
            <Text style={styles.subscriptionItemPrice}>${subscription.price}</Text>
          </View>
        </TouchableOpacity>
      )}

      {isExpanded && (
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
              <Image
                source={{ uri: subscription.icon }}
                style={styles.expandedSubscriptionItemIcon}
              />

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

              <Text style={styles.expandedSubscriptionItemFieldValue}>
                {subscription.description}
              </Text>
            </View>

            <View style={styles.expandedSubscriptionItemField}>
              <Text style={styles.expandedSubscriptionItemFieldName}>Pay date</Text>

              <Text style={styles.expandedSubscriptionItemFieldValue}>{subscription.pay_date}</Text>
            </View>
          </View>

          <View style={styles.expandedSubscriptionItemBottom}>
            <View style={styles.viewSubscriptionDetails}>
              <MainButton
                title={'View details'}
                onPress={() => router.push('/subscriptions/subscription')}
              />
            </View>

            <Pressable style={styles.removeSubscription}>
              <MaterialIcons name="delete" size={27} color="white" />
            </Pressable>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  subscriptionItem: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#f3f3f3',
  },
  subscriptionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionItemIconBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    marginRight: 12,
  },
  subscriptionItemInfo: {},
  subscriptionItemIcon: {
    width: 28,
    height: 28,
  },
  subscriptionItemName: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
  },
  subscriptionItemPayDate: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    opacity: 0.5,
  },
  subscriptionItemRight: {},
  subscriptionItemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 20,
  },
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
});
