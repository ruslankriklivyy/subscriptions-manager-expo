import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';

import { FormStyles } from '../../styles/FormStyles';
import { MainInput } from '../UI/MainInput';
import { FormErrorMessage } from '../UI/FormErrorMessage';
import { MainButton } from '../UI/MainButton';
import { DatePicker } from '../UI/DatePicker';
import { MainHeader } from '../UI/MainHeader';
import { ControlColor } from '../UI/ControlColor';
import { UploadImage } from '../UI/UploadImage';

interface IAddFormProps {
  onClose: () => void;
}

interface ICreateSubscriptionFormValues {
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
  name: '',
  description: '',
  price: '',
  pay_date: new Date(),
  pay_plan: '',
  color: '',
  icon: {},
};

export const SubscriptionAddForm: FC<IAddFormProps> = ({ onClose }) => {
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
    onClose();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.box}>
          <MainHeader title={'Create a subscription'} onBack={onClose} />

          <View>
            <View style={FormStyles.formControl}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <UploadImage onChange={onChange} label={'Icon'} />
                )}
                name="icon"
              />
              {/*{errors.icon && <FormErrorMessage errorMessage={errors.icon.message} />}*/}
            </View>

            <View style={FormStyles.formControl}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <MainInput
                    isImportant
                    isSecureTextEntry
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
                    isSecureTextEntry
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
                    isSecureTextEntry
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
                    isSecureTextEntry
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
                title={'Create'}
                backgroundColor={'#33d71e'}
                textColor={'#000'}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
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
