import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';

import { FormSocials } from '../../components/UI/FormSocials';
import { MainInput } from '../../components/UI/MainInput';
import { FormErrorMessage } from '../../components/UI/FormErrorMessage';
import { MainButton } from '../../components/UI/MainButton';
import { authStyles } from './auth.styles';

interface ISignInFormValues {
  email: string;
  password: string;
}

const signInValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required field' })
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

  const onSubmit: SubmitHandler<SignInValidationSchema> = async (values: ISignInFormValues) => {};

  return (
    <View style={authStyles.box}>
      <Text style={authStyles.title}>Sign In</Text>

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

        <View style={authStyles.formActions}>
          <MainButton title={'Send'} backgroundColor={'#004EEC'} onPress={handleSubmit(onSubmit)} />

          <View style={authStyles.linkToSingIn}>
            <Text style={authStyles.text}>Are you not have an account?</Text>

            <Pressable onPress={() => router.push('/home')}>
              <Text style={authStyles.link}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
