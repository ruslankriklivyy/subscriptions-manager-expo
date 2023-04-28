import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormStyles } from '../../styles/FormStyles';
import { MainInput } from '../UI/MainInput';
import { FormErrorMessage } from '../UI/FormErrorMessage';
import { DatePicker } from '../UI/DatePicker';
import { MainButton } from '../UI/MainButton';

interface IUserEditFormValues {
  email: string;
  full_name: string;
  birth_date: Date;
}

const userEditValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required field' })
    .email({ message: 'Must be a valid email' }),
  full_name: z.string().min(1, { message: 'Full Name is required field' }),
  birth_date: z.date(),
});

type UserEditValidationSchema = z.infer<typeof userEditValidationSchema>;

export const UserEditForm = () => {
  const defaultValues: IUserEditFormValues = {
    email: '',
    full_name: '',
    birth_date: new Date(),
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditValidationSchema>({
    defaultValues,
    resolver: zodResolver(userEditValidationSchema),
  });

  const onSubmit: SubmitHandler<UserEditValidationSchema> = async (
    values: IUserEditFormValues
  ) => {};

  return (
    <SafeAreaView style={styles.box}>
      <ScrollView>
        <View style={FormStyles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <MainInput
                isImportant
                isSecureTextEntry
                value={value}
                isError={!!error}
                label={'Email'}
                placeholder={'Enter your email'}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />
          {errors.email && <FormErrorMessage errorMessage={errors.email.message} />}
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
                label={'Full Name'}
                placeholder={'Enter your full name'}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="full_name"
          />
          {errors.full_name && <FormErrorMessage errorMessage={errors.full_name.message} />}
        </View>

        <View style={FormStyles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker isImportant onChange={onChange} value={value} label={'Birth date'} />
            )}
            name="birth_date"
          />
          {errors.birth_date && <FormErrorMessage errorMessage={errors.birth_date.message} />}
        </View>

        <View style={FormStyles.formActions}>
          <MainButton
            title={'Edit'}
            backgroundColor={'#33d71e'}
            textColor={'#000'}
            onPress={handleSubmit(onSubmit)}
          />

          <View style={styles.logout}>
            <MainButton title={'Logout'} onPress={() => null} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {},
  logout: {
    marginTop: 20,
  },
});
