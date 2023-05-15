import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';

import { FormStyles } from '../../styles/FormStyles';
import { MainInput } from '../UI/MainInput';
import { FormErrorMessage } from '../UI/FormErrorMessage';
import { DatePicker } from '../UI/DatePicker';
import { MainButton } from '../UI/MainButton';
import { $user, fetchOneUserFx, setUser } from '../../stores/UserStore';
import UserService from '../../services/UserService';
import { IUser } from '../../types/entities/User';
import { MainModal } from '../UI/MainModal';
import { Info } from '../UI/Info';
import { auth } from '../../config/firebase';
import { UploadImage } from '../UI/UploadImage';

export interface IUserEditFormValues {
  email: string;
  full_name: string;
  birth_date: Date;
  avatar: ImagePickerAsset | null;
}

const userEditValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required field' })
    .email({ message: 'Must be a valid email' }),
  full_name: z.string().min(1, { message: 'Full Name is required field' }),
  birth_date: z.date(),
  avatar: z.any(),
});

type UserEditValidationSchema = z.infer<typeof userEditValidationSchema>;

export const UserEditForm = () => {
  const router = useRouter();
  const user = useStore($user);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestStatus, setRequestStatus] = useState<'success' | 'failure' | null>(null);

  const defaultValues = (values?: IUser) => ({
    email: values?.email || '',
    full_name: values?.full_name || '',
    birth_date: values?.birth_date?.toDate() || new Date(),
    avatar: values?.avatar || null,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditValidationSchema>({
    defaultValues: defaultValues(user),
    resolver: zodResolver(userEditValidationSchema),
  });

  const onSubmit: SubmitHandler<UserEditValidationSchema> = async (values: IUserEditFormValues) => {
    setIsLoading(true);

    try {
      await UserService.update(user.id, values);
      const data = await fetchOneUserFx(user.auth_id);
      defaultValues(data);
      setRequestStatus('success');
    } catch (e) {
      setRequestStatus('failure');
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/auth/signup');
  };

  useEffect(() => {
    fetchOneUserFx(user.auth_id);
  }, []);

  useEffect(() => {
    defaultValues(user);
  }, [user]);

  return (
    <>
      <SafeAreaView style={styles.box}>
        <ScrollView>
          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <UploadImage onChange={onChange} defaultValue={value} label={'Avatar'} />
              )}
              name="avatar"
            />
            {/*{errors.icon && <FormErrorMessage errorMessage={errors.icon.message} />}*/}
          </View>

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <MainInput
                  isImportant
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
              isLoading={isLoading}
              title={'Edit'}
              backgroundColor={'#33d71e'}
              textColor={'#000'}
              onPress={handleSubmit(onSubmit)}
            />

            <View style={styles.logout}>
              <MainButton title={'Logout'} onPress={onLogout} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <MainModal isModalVisible={!!requestStatus} onClose={() => setRequestStatus(null)}>
        {requestStatus === 'success' && (
          <Info
            type={'success'}
            title={'Success'}
            description={'User successful updated!'}
            onAction={() => setRequestStatus(null)}
          />
        )}

        {requestStatus === 'failure' && (
          <Info
            type={'failure'}
            title={'Failure'}
            description={'User not updated!'}
            onAction={() => setRequestStatus(null)}
          />
        )}
      </MainModal>
    </>
  );
};

const styles = StyleSheet.create({
  box: {},
  logout: {
    marginTop: 20,
  },
});
