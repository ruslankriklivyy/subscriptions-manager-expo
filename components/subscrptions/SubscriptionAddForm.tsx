import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
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
import { createSubscriptionFx, fetchSubscriptionsFx } from '../../stores/SubscriptionStore';

interface IAddFormProps {
  onClose: () => void;
}

export interface ICreateSubscriptionFormValues {
  user_id: string;
  name: string;
  description: string;
  price: string;
  pay_date: Date;
  pay_plan: string;
  color: string;
  icon: any;
}

const createSubscriptionValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required field' }),
  description: z.string(),
  price: z.string().min(1, { message: 'Price is required field' }),
  pay_date: z.date(),
  pay_plan: z.string().min(1, { message: 'Pay plan is required field' }),
  color: z.string().min(3, { message: 'Color is required field' }),
  icon: z.any(),
});

type CreateSubscriptionValidationSchema = z.infer<typeof createSubscriptionValidationSchema>;

const defaultValues: ICreateSubscriptionFormValues = {
  user_id: '',
  name: '',
  description: '',
  price: '',
  pay_date: new Date(),
  pay_plan: '',
  color: '',
  icon: {},
};

export const SubscriptionAddForm: FC<IAddFormProps> = ({ onClose }) => {
  const user = useStore($user);
  const isCreating = useStore(createSubscriptionFx.pending);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubscriptionValidationSchema>({
    defaultValues,
    resolver: zodResolver(createSubscriptionValidationSchema),
  });

  const onSubmit: SubmitHandler<CreateSubscriptionValidationSchema> = async (
    values: ICreateSubscriptionFormValues
  ) => {
    await createSubscriptionFx({ ...values, user_id: user.id });
    await fetchSubscriptionsFx({ userId: user.id, offset: 0, perPage: 4 });
    onClose();
  };

  return (
    <SafeAreaView style={styles.box}>
      <MainHeader title={'Create a subscription'} onBack={onClose} />

      <ScrollView
        style={FormStyles.form}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={FormStyles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange } }) => <UploadImage onChange={onChange} label={'Icon'} />}
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
                value={value}
                isError={!!error}
                keyboardType={'numeric'}
                label={'Price'}
                placeholder={'Enter subscription price'}
                onChangeText={onChange}
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <ControlColor onChange={onChange} value={value} label={'Color'} isImportant />
            )}
            name="color"
          />
          {errors.color && <FormErrorMessage errorMessage={errors.color.message} />}
        </View>

        <View style={FormStyles.formActions}>
          <MainButton
            isLoading={isCreating}
            title={'Create'}
            backgroundColor={'#33d71e'}
            textColor={'#000'}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 34,
    marginBottom: 30,
    textAlign: 'center',
  },
});
