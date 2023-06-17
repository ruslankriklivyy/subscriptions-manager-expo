import { View, Text, Pressable, ScrollView } from 'react-native';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useStore } from 'effector-react';

import { MainInput } from '../../components/UI/MainInput';
import { FormErrorMessage } from '../../components/UI/FormErrorMessage';
import { FormSocials } from '../../components/UI/FormSocials';
import { MainButton } from '../../components/UI/MainButton';
import { AuthStyles } from './auth.styles';
import { FormStyles } from '../../styles/FormStyles';
import { UploadImage } from '../../components/UI/UploadImage';
import { signUpFx } from '../../stores/AuthStore';
import { setModal } from '../../stores/ModalStore';
import { buildRequiredErrorMessage } from '../../utils/build-required-error-message';
import { GeneralStyles } from '../../styles/GeneralStyles';

interface ISignUpFormValues {
  email: string;
  password: string;
  repeatPassword: string;
  avatar: any;
}

const signUpValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: buildRequiredErrorMessage('Email') })
      .email({ message: 'Must be a valid email' }),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
    repeatPassword: z.string().min(1, { message: buildRequiredErrorMessage('Repeat Password') }),
    avatar: z.any(),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    path: ['repeatPassword'],
    message: "Password don't match",
  });

type SignUpValidationSchema = z.infer<typeof signUpValidationSchema>;

const defaultValues: ISignUpFormValues = {
  email: '',
  password: '',
  repeatPassword: '',
  avatar: null,
};

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValidationSchema>({
    defaultValues,
    resolver: zodResolver(signUpValidationSchema),
  });
  const isLoading = useStore(signUpFx.pending);
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpValidationSchema> = async (values: ISignUpFormValues) => {
    try {
      await signUpFx({ email: values.email, password: values.password, avatar: values.avatar });
      router.push('/home');
    } catch (error) {
      setModal({ message: error.message, type: 'error' });
    }
  };

  return (
    <ScrollView contentContainerStyle={GeneralStyles.scrollViewBox}>
      <View style={AuthStyles.box}>
        <Text style={FormStyles.title}>Sign Up</Text>

        <View>
          <FormSocials />

          <View style={FormStyles.formControl}>
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <UploadImage onChange={onChange} label={'Avatar'} />
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
                  isSecureTextEntry
                  value={value}
                  isError={!!error}
                  label={'Password'}
                  placeholder={'Enter your password'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="password"
            />
            {errors.password && <FormErrorMessage errorMessage={errors.password.message} />}
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
                  label={'Repeat password'}
                  placeholder={'Repeat your password'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
              name="repeatPassword"
            />
            {errors.repeatPassword && (
              <FormErrorMessage errorMessage={errors.repeatPassword.message} />
            )}
          </View>

          <View style={FormStyles.formActions}>
            <MainButton
              isLoading={isLoading}
              title={'Send'}
              backgroundColor={'#004EEC'}
              onPress={handleSubmit(onSubmit)}
            />

            <View style={AuthStyles.linkToSingIn}>
              <Text style={AuthStyles.text}>Do you already have account?</Text>

              <Pressable onPress={() => router.push('/auth/signin')}>
                <Text style={AuthStyles.link}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
