import { SubscriptionForm } from '../../components/subscrptions/SubscriptionForm';
import { useSearchParams } from 'expo-router';

const EditSubscription = () => {
  const subscriptionId = useSearchParams()?.id as string;

  return <SubscriptionForm subscriptionId={subscriptionId} />;
};

export default EditSubscription;
