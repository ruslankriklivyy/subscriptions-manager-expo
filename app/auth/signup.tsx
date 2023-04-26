import { View, Text, Pressable } from 'react-native';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';

import { MainInput } from '../../components/UI/MainInput';
import { FormErrorMessage } from '../../components/UI/FormErrorMessage';
import { FormSocials } from '../../components/UI/FormSocials';
import { MainButton } from '../../components/UI/MainButton';
import { authStyles } from './auth.styles';

interface ISignUpFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const signUpValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required field' })
      .email({ message: 'Must be a valid email' }),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
    repeatPassword: z.string().min(1, { message: 'Repeat Password is required field' }),
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
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpValidationSchema> = async (values: ISignUpFormValues) => {};

  return (
    <View style={authStyles.box}>
      <Text style={authStyles.title}>Sign Up</Text>

      <View>
        <FormSocials />

        <View style={authStyles.formControl}>
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

        <View style={authStyles.formControl}>
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

        <View style={authStyles.formControl}>
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

        <View style={authStyles.formActions}>
          <MainButton title={'Send'} backgroundColor={'#004EEC'} onPress={handleSubmit(onSubmit)} />

          <View style={authStyles.linkToSingIn}>
            <Text style={authStyles.text}>Do you already have account?</Text>

            <Pressable onPress={() => router.push('/auth/signin')}>
              <Text style={authStyles.link}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
