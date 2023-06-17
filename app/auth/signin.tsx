import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useStore } from 'effector-react';

import { FormSocials } from '../../components/UI/FormSocials';
import { MainInput } from '../../components/UI/MainInput';
import { FormErrorMessage } from '../../components/UI/FormErrorMessage';
import { MainButton } from '../../components/UI/MainButton';
import { AuthStyles } from './auth.styles';
import { FormStyles } from '../../styles/FormStyles';
import { signInFx } from '../../stores/AuthStore';
import { buildRequiredErrorMessage } from '../../utils/build-required-error-message';
import { setModal } from '../../stores/ModalStore';
import { GeneralStyles } from '../../styles/GeneralStyles';

interface ISignInFormValues {
  email: string;
  password: string;
}

const signInValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: buildRequiredErrorMessage('Email') })
    .email({ message: 'Must be a valid email' }),
  password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
});

type SignInValidationSchema = z.infer<typeof signInValidationSchema>;

const defaultValues: ISignInFormValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValidationSchema>({
    defaultValues,
    resolver: zodResolver(signInValidationSchema),
  });
  const router = useRouter();
  const isLoading = useStore(signInFx.pending);

  const onSubmit: SubmitHandler<SignInValidationSchema> = async (values: ISignInFormValues) => {
    try {
      await signInFx({ email: values.email, password: values.password });
      router.push('/home');
    } catch (error) {
      setModal({ message: error.message, type: 'error' });
    }
  };

  return (
    <ScrollView contentContainerStyle={GeneralStyles.scrollViewBox}>
      <View style={AuthStyles.box}>
        <Text style={FormStyles.title}>Sign In</Text>

        <View>
          <FormSocials />

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

          <View style={FormStyles.formActions}>
            <MainButton
              isLoading={isLoading}
              title={'Send'}
              backgroundColor={'#004EEC'}
              onPress={handleSubmit(onSubmit)}
            />

            <View style={AuthStyles.linkToSingIn}>
              <Text style={AuthStyles.text}>Are you not have an account?</Text>

              <Pressable onPress={() => router.push('/auth/signup')}>
                <Text style={AuthStyles.link}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
