import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner-native';
import type { z } from 'zod';
import type { ForgotPasswordOutput, ForgotPasswordPayload } from '@/features/auth/contracts/auth-service.contract';
import { authService } from '@/features/auth/services';
import { forgotPasswordFormSchema } from '@/features/auth/validations';
import type { AuthStackNavigationProp } from '@/navigation/auth.navigator.types';
import { ControlledTextInput } from '@/shared/components/form/controlled-text-input';
import { Button } from '@/shared/components/ui/button';
import { Screen } from '@/shared/components/ui/screen';
import { Text } from '@/shared/components/ui/text';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import type { ApiResponseError } from '@/types/api';
import type { HttpError } from '@/types/http';

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

interface ForgotPasswordScreenProps {}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = () => {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {},
  });

  const { navigate } = useNavigation<AuthStackNavigationProp<'ForgotPasswordScreen'>>();

  const theme = useAppTheme();

  const { mutate, status } = useMutation<
    ForgotPasswordOutput,
    HttpError<ApiResponseError<ForgotPasswordPayload>>,
    ForgotPasswordPayload
  >({
    mutationFn: async (payload) => authService.forgotPassword(payload),
    onSuccess: () => {
      toast.success('Confira seu email!', {
        description: 'Um código para redefinir sua senha foi enviado para seu email.',
      });
      navigate('ResetPasswordScreen');
    },
    onError: () => {
      toast.error('Tivemos um problema!', {
        description: 'Tente novamente ou entre em contato com o suporte.',
      });
    },
  });

  const onSubmit = form.handleSubmit((data: ForgotPasswordFormData) => {
    mutate(data);
  });

  const isLoading = status === 'pending';

  return (
    <Screen canGoBack>
      <Text preset="headingLarge" style={{ marginBottom: theme.spacing.s16 }}>
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" style={{ marginBottom: theme.spacing.s32 }}>
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <ControlledTextInput
        control={form.control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{
          style: {
            marginBottom: theme.spacing.s40,
          },
        }}
      />

      <Button loading={isLoading} disabled={!form.formState.isValid} onPress={onSubmit} title="Recuperar senha" />
    </Screen>
  );
};
