import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { ImagePickerAsset } from 'expo-image-picker/src/ImagePicker.types';

import { FormStyles } from '../../styles/FormStyles';
import { MainInput } from '../UI/MainInput';
import { FormErrorMessage } from '../UI/FormErrorMessage';
import { DatePicker } from '../UI/DatePicker';
import { MainButton } from '../UI/MainButton';
import { $user, fetchOneUserFx, setUser, updateUserFx } from '../../stores/UserStore';
import UserService from '../../services/UserService';
import { IUser } from '../../types/entities/User';
import { auth } from '../../config/firebase';
import { UploadImage } from '../UI/UploadImage';
import { setModal } from '../../stores/ModalStore';
import { IFirebaseImage } from '../../types/common/IFirebaseImage';
import { buildRequiredErrorMessage } from '../../utils/build-required-error-message';

export interface IUserEditFormValues {
  email: string;
  full_name: string;
  birth_date: Date;
  avatar: ImagePickerAsset | IFirebaseImage | null;
}

const userEditValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: buildRequiredErrorMessage('Email') })
    .email({ message: 'Must be a valid email' }),
  full_name: z.string().min(1, { message: buildRequiredErrorMessage('Full Name') }),
  birth_date: z.date(),
  avatar: z.any(),
});

type UserEditValidationSchema = z.infer<typeof userEditValidationSchema>;

export const UserEditForm = () => {
  const router = useRouter();
  const user = useStore($user);
  const isUpdating = useStore(updateUserFx.pending);

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
    try {
      await UserService.update(user.id, values);
      const data = await fetchOneUserFx(user.auth_id);
      defaultValues(data);
      setModal({ message: 'User updated!', type: 'success' });
    } catch (error) {
      setModal({ message: error.message, type: 'error' });
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
    <SafeAreaView>
      <ScrollView>
        <View style={FormStyles.formControl}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <UploadImage onChange={onChange} defaultValue={value} label={'Avatar'} />
            )}
            name="avatar"
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
            title={'Edit'}
            backgroundColor={'#33d71e'}
            textColor={'#000'}
            onPress={handleSubmit(onSubmit)}
          />

          <View style={styles.logout}>
            <MainButton isLoading={isUpdating} title={'Logout'} onPress={onLogout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logout: {
    marginTop: 20,
  },
});
