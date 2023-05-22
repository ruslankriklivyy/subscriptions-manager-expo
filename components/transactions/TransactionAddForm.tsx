import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useStore } from 'effector-react';
import moment from 'moment';

import { FormStyles } from '../../styles/FormStyles';
import { MainInput } from '../UI/MainInput';
import { FormErrorMessage } from '../UI/FormErrorMessage';
import { DatePicker } from '../UI/DatePicker';
import { MainButton } from '../UI/MainButton';
import { MainHeader } from '../UI/MainHeader';
import { createTransactionFx, fetchTransactionsFx } from '../../stores/TransactionStore';
import { $subscription } from '../../stores/SubscriptionStore';
import { ITransactionDateStatistic } from '../../types/entities/Transaction';
import { $user } from '../../stores/UserStore';

interface ITransactionAddFormProps {
  onClose: () => void;
}

export interface ICreateTransactionFormValues {
  date: Date;
  date_statistic: ITransactionDateStatistic;
  price: string;
  subscription_id: string;
  user_id: string;
}

const createTransactionValidationSchema = z.object({
  price: z.string().min(1, { message: 'Price is required field' }),
  date: z.date(),
});

type CreateTransactionValidationSchema = z.infer<typeof createTransactionValidationSchema>;

const defaultValues: ICreateTransactionFormValues = {
  price: '',
  date: new Date(),
  date_statistic: null,
  subscription_id: '',
  user_id: '',
};

export const TransactionAddForm: FC<ITransactionAddFormProps> = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTransactionValidationSchema>({
    defaultValues,
    resolver: zodResolver(createTransactionValidationSchema),
  });
  const subscription = useStore($subscription);
  const user = useStore($user);
  const isCreating = useStore(createTransactionFx.pending);

  const onSubmit: SubmitHandler<CreateTransactionValidationSchema> = async (
    values: ICreateTransactionFormValues
  ) => {
    await createTransactionFx({
      ...values,
      subscription_id: subscription.id,
      user_id: user.id,
      date_statistic: {
        month_index: moment(values.date).month(),
        year: moment(values.date).year(),
      },
    });
    await fetchTransactionsFx({ subscriptionId: subscription.id, offset: 5 });
    onClose();
  };

  return (
    <SafeAreaView style={styles.box}>
      <ScrollView>
        <View>
          <MainHeader title={'Create a transaction'} onBack={onClose} />

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
                  placeholder={'Enter transaction price'}
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
                <DatePicker isImportant onChange={onChange} value={value} label={'Date'} />
              )}
              name="date"
            />
            {errors.date && <FormErrorMessage errorMessage={errors.date.message} />}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
});
