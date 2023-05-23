import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useMemo } from 'react';
import { useStore } from 'effector-react';

import { FormStyles } from '../../styles/FormStyles';
import { MainInput } from '../UI/MainInput';
import { FormErrorMessage } from '../UI/FormErrorMessage';
import { MainButton } from '../UI/MainButton';
import { DatePicker } from '../UI/DatePicker';
import { MainHeader } from '../UI/MainHeader';
import { ControlColor } from '../UI/ControlColor';
import { UploadImage } from '../UI/UploadImage';
import { $user } from '../../stores/UserStore';
import {
  $subscription,
  createSubscriptionFx,
  fetchSubscriptionFx,
  fetchSubscriptionsFx,
  updateSubscriptionFx,
} from '../../stores/SubscriptionStore';
import { Loader } from '../UI/Loader';
import { buildRequiredErrorMessage } from '../../utils/build-required-error-message';
import { GeneralStyles } from '../../styles/GeneralStyles';

interface ISubscriptionFormProps {
  subscriptionId?: string;
  onClose: () => void;
}

export interface ISubscriptionFormValues {
  user_id: string;
  name: string;
  description: string;
  price: number;
  pay_date: any;
  pay_plan: string;
  color: string;
  icon: any;
}

const createSubscriptionValidationSchema = z.object({
  name: z.string().min(1, { message: buildRequiredErrorMessage('Name') }),
  description: z.string(),
  price: z.number().min(1, { message: buildRequiredErrorMessage('Price') }),
  pay_date: z.date(),
  pay_plan: z.string().min(1, { message: buildRequiredErrorMessage('Pay plan') }),
  color: z.string().min(3, { message: buildRequiredErrorMessage('Color') }),
  icon: z.any(),
});

type CreateSubscriptionValidationSchema = z.infer<typeof createSubscriptionValidationSchema>;

export const SubscriptionForm: FC<ISubscriptionFormProps> = ({ subscriptionId, onClose }) => {
  const formTitle = !subscriptionId ? 'Create a subscription' : 'Edit a subscription';
  const formButtonTitle = !subscriptionId ? 'Create' : 'Edit';

  const user = useStore($user);
  const subscription = useStore($subscription);
  const isLoading = useStore(fetchSubscriptionFx.pending);
  const isCreating = useStore(createSubscriptionFx.pending);

  const defaultValues = (values?: Partial<ISubscriptionFormValues>) => {
    return {
      user_id: values?.user_id || '',
      name: values?.name || '',
      description: values?.description || '',
      price: values?.price || 0,
      pay_date: values?.pay_date?.toDate() || new Date(),
      pay_plan: values?.pay_plan || '',
      color: values?.color || '',
      icon: values?.icon || null,
    };
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubscriptionValidationSchema>({
    defaultValues: useMemo(
      () => defaultValues(subscriptionId ? subscription : {}),
      [subscription, subscriptionId]
    ),
    resolver: zodResolver(createSubscriptionValidationSchema),
  });

  const onSubmit: SubmitHandler<CreateSubscriptionValidationSchema> = async (
    values: ISubscriptionFormValues
  ) => {
    if (!subscriptionId) {
      await createSubscriptionFx({ ...values, user_id: user.id });
    } else {
      await updateSubscriptionFx({ id: subscriptionId, payload: values });
    }

    await fetchSubscriptionsFx({ userId: user.id, offset: 5, order: 'created_at' });
    onClose();
  };

  useEffect(() => {
    subscriptionId && fetchSubscriptionFx(subscriptionId);
  }, [subscriptionId]);

  return (
    <SafeAreaView style={GeneralStyles.box}>
      <MainHeader title={formTitle} onBack={onClose} />

      {isLoading && <Loader />}

      {!isLoading && (
        <ScrollView
          style={FormStyles.form}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <UploadImage onChange={onChange} label={'Icon'} />
              )}
              name="icon"
            />
          </View>

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <MainInput
                  isImportant
                  value={value}
                  isError={!!error}
                  label={'Name'}
                  placeholder={'Enter subscription name'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="name"
            />
            {errors.name && <FormErrorMessage errorMessage={errors.name.message} />}
          </View>

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <MainInput
                  isMultiline
                  value={value}
                  isError={!!error}
                  label={'Description'}
                  placeholder={'Enter description'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="description"
            />
            {errors.description && <FormErrorMessage errorMessage={errors.description.message} />}
          </View>

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <MainInput
                  isImportant
                  value={value}
                  isError={!!error}
                  label={'Pay plan'}
                  placeholder={'Enter subscription pay plan'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="pay_plan"
            />
            {errors.pay_plan && <FormErrorMessage errorMessage={errors.pay_plan.message} />}
          </View>

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <MainInput
                  isImportant
                  value={String(value)}
                  isError={!!error}
                  keyboardType={'numeric'}
                  label={'Price'}
                  placeholder={'Enter subscription price'}
                  onChangeText={(val) => onChange(Number(val))}
                  onBlur={onBlur}
                />
              )}
              name="price"
            />
            {errors.price && <FormErrorMessage errorMessage={errors.price.message} />}
          </View>

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker isImportant onChange={onChange} value={value} label={'Pay date'} />
              )}
              name="pay_date"
            />
            {errors.pay_date && <FormErrorMessage errorMessage={errors.pay_date.message} />}
          </View>

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <ControlColor onChange={onChange} value={value} label={'Color'} isImportant />
              )}
              name="color"
            />
            {errors.color && <FormErrorMessage errorMessage={errors.color.message} />}
          </View>

          <View style={FormStyles.formActions}>
            <MainButton
              isLoading={isCreating}
              title={formButtonTitle}
              backgroundColor={'#33d71e'}
              textColor={'#000'}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 34,
    marginBottom: 30,
    textAlign: 'center',
  },
});
