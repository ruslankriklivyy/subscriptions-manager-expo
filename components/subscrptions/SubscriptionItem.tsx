import { Image, StyleSheet, View, Text, LayoutAnimation, TouchableOpacity } from 'react-native';
import { FC, useState } from 'react';

import { ISubscription } from '../../types/entities/Subscription';
import { ExpandedSubscriptionItem } from './ExpandedSubscriptionItem';

interface ISubscriptionItemProps {
  subscription: ISubscription;
}

export const SubscriptionItem: FC<ISubscriptionItemProps> = ({ subscription }) => {
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
        <ExpandedSubscriptionItem isView subscription={subscription} onPress={onPress} />
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
});
