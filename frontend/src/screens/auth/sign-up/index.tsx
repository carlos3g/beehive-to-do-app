import type { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { toast } from 'sonner-native';
import { View } from 'react-native';
import { signUpFormSchema } from '@/features/auth/validations';
import type { SignUpOutput, SignUpPayload } from '@/features/auth/contracts/auth-service.contract';
import type { HttpError } from '@/types/http';
import type { ApiResponseError } from '@/types/api';
import { authService } from '@/features/auth/services';
import { Screen } from '@/shared/components/ui/screen';
import type { AuthStackNavigationProp, AuthStackScreenProps } from '@/navigation/auth.navigator.types';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { Button } from '@/shared/components/ui/button';
import { Text } from '@/shared/components/ui/text';
import { ControlledTextInput } from '@/shared/components/form/controlled-text-input';
import { ControlledPasswordInput } from '@/shared/components/form/controlled-password-input';

type SignUpFormData = z.infer<typeof signUpFormSchema>;

interface SignUpScreenProps extends AuthStackScreenProps<'SignUpScreen'> {}

export const SignUpScreen: React.FC<SignUpScreenProps> = () => {
  const { navigate } = useNavigation<AuthStackNavigationProp<'SignUpScreen'>>();

  const theme = useAppTheme();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      acceptTerms: true,
    },
    mode: 'onChange',
  });

  const { mutate, status } = useMutation<SignUpOutput, HttpError<ApiResponseError<SignUpPayload>>, SignUpPayload>({
    mutationFn: async (payload) => authService.signUp(payload),
    onSuccess: () => {
      navigate('SignInScreen');
      toast.success('Conta criada', {
        description: 'Você pode fazer login agora!',
      });
    },
    onError: (e) => {
      toast.error('Tivemos um problema!', {
        description: e.response?.data.message || 'Tente novamente ou entre em contato com o suporte.',
      });
    },
  });

  const onSubmit = form.handleSubmit((data: SignUpFormData) => {
    mutate(data);
  });

  const isLoading = status === 'pending';

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" style={{ marginBottom: theme.spacing.s32 }}>
        Criar nova conta
      </Text>

      <View
        style={{
          gap: theme.spacing.s20,
          marginBottom: theme.spacing.s20,
        }}
      >
        <ControlledTextInput control={form.control} name="name" label="Nome" placeholder="Digite seu nome" />
        <ControlledTextInput control={form.control} name="email" label="E-mail" placeholder="Digite seu e-mail" />
        <ControlledPasswordInput control={form.control} name="password" label="Senha" placeholder="Digite sua senha" />
        <ControlledPasswordInput
          control={form.control}
          name="passwordConfirmation"
          label="Confirmar senha"
          placeholder="Digite a mesma senha"
        />
      </View>

      <Button loading={isLoading} disabled={!form.formState.isValid} onPress={onSubmit} title="Criar conta" />
    </Screen>
  );
};
