import { createEffect, createEvent, createStore } from 'effector';

import { ISubscription } from '../types/entities/Subscription';
import SubscriptionService, { IGetAllSubscriptionsProps } from '../services/SubscriptionService';
import { ICreateSubscriptionFormValues } from '../components/subscrptions/SubscriptionAddForm';

export const fetchSubscriptionsFx = createEffect(async (payload: IGetAllSubscriptionsProps) => {
  return (await SubscriptionService.getAll(payload)) as ISubscription[];
});
export const fetchSubscriptionFx = createEffect(async (id: string) => {
  return await SubscriptionService.getOne(id);
});
export const createSubscriptionFx = createEffect(async (payload: ICreateSubscriptionFormValues) => {
  return await SubscriptionService.createOne(payload);
});
export const deleteSubscriptionFx = createEffect(async ({ id, iconUrl }) => {
  return await SubscriptionService.deleteOne(id, iconUrl);
});

export const setSubscriptions = createEvent<ISubscription[]>();
export const setSubscription = createEvent<ISubscription>();

export const $subscriptions = createStore<ISubscription[] | null>(null)
  .on(setSubscriptions, (state, payload) => payload)
  .on(fetchSubscriptionsFx.doneData, (_, repos) => repos);

export const $subscription = createStore(null)
  .on(setSubscription, (state, payload) => payload)
  .on(fetchSubscriptionFx.doneData, (_, repos) => repos)
  .on(createSubscriptionFx.doneData, (_, repos) => repos);
