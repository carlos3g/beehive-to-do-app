import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'sonner-native';
import { authService } from '@/features/auth/services';
import type { SignInOutput, SignInPayload } from '@/features/auth/contracts/auth-service.contract';
import { loginFormSchema } from '@/features/auth/validations';
import { useAuth } from '@/features/auth/hooks/use-auth';
import type { HttpError } from '@/types/http';
import type { ApiResponseError } from '@/types/api';
import { Screen } from '@/shared/components/ui/screen';
import type { AuthStackNavigationProp, AuthStackScreenProps } from '@/navigation/auth.navigator.types';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { Button } from '@/shared/components/ui/button';
import { Text } from '@/shared/components/ui/text';
import { ControlledTextInput } from '@/shared/components/form/controlled-text-input';
import { ControlledPasswordInput } from '@/shared/components/form/controlled-password-input';

type LoginFormData = z.infer<typeof loginFormSchema>;

interface SignInScreenProps extends AuthStackScreenProps<'SignInScreen'> {}

export const SignInScreen: React.FC<SignInScreenProps> = () => {
  const { handleSignIn } = useAuth();
  const { navigate } = useNavigation<AuthStackNavigationProp<'SignInScreen'>>();

  const theme = useAppTheme();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      remember: true,
    },
  });

  const { mutate, status } = useMutation<SignInOutput, HttpError<ApiResponseError<SignInPayload>>, SignInPayload>({
    mutationFn: async (payload) => authService.signIn(payload),
    onSuccess: (response) => {
      handleSignIn(response);
    },
    onError: () => {
      toast.error('Opa!!', {
        description: 'E-mail ou senha inválidos',
      });
    },
  });

  const onSubmit = form.handleSubmit((data: LoginFormData) => {
    mutate(data);
  });

  const isLoading = status === 'pending';

  const navigateToForgotPasswordScreen = () => {
    navigate('ForgotPasswordScreen');
  };

  const navigateToSignUpScreen = () => {
    navigate('SignUpScreen');
  };

  return (
    <Screen scrollable>
      <Text preset="headingLarge" style={{ marginBottom: theme.spacing.s8 }}>
        Olá
      </Text>

      <Text preset="paragraphLarge" style={{ marginBottom: theme.spacing.s40 }}>
        Digite seu e-mail e senha para entrar
      </Text>

      <ControlledTextInput
        control={form.control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{
          style: {
            marginBottom: theme.spacing.s20,
          },
        }}
      />

      <ControlledPasswordInput
        control={form.control}
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{
          style: {
            marginBottom: theme.spacing.s20,
          },
        }}
      />

      <Text
        onPress={navigateToForgotPasswordScreen}
        preset="paragraphSmall"
        bold
        style={{
          color: theme.colors.primary,
        }}
      >
        Esqueci minha senha
      </Text>

      <Button
        loading={isLoading}
        disabled={!form.formState.isValid}
        onPress={onSubmit}
        title="Entrar"
        style={{
          marginTop: theme.spacing.s48,
        }}
      />

      <Button
        onPress={navigateToSignUpScreen}
        title="Criar uma conta"
        preset="outline"
        style={{
          marginTop: theme.spacing.s16,
        }}
      />
    </Screen>
  );
};
