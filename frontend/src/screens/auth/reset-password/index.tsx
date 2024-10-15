import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { toast } from 'sonner-native';
import type { z } from 'zod';
import type { ResetPasswordOutput, ResetPasswordPayload } from '@/features/auth/contracts/auth-service.contract';
import { authService } from '@/features/auth/services';
import { resetPasswordFormSchema } from '@/features/auth/validations';
import type { AuthStackNavigationProp } from '@/navigation/auth.navigator.types';
import { ControlledPasswordInput } from '@/shared/components/form/controlled-password-input';
import { ControlledTextInput } from '@/shared/components/form/controlled-text-input';
import { Button } from '@/shared/components/ui/button';
import { Screen } from '@/shared/components/ui/screen';
import { Text } from '@/shared/components/ui/text';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import type { ApiResponseError } from '@/types/api';
import type { HttpError } from '@/types/http';

type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

interface ResetPasswordScreenProps {}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = () => {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: 'onChange',
  });

  const { navigate } = useNavigation<AuthStackNavigationProp<'ResetPasswordScreen'>>();

  const theme = useAppTheme();

  const { mutate, status } = useMutation<
    ResetPasswordOutput,
    HttpError<ApiResponseError<ResetPasswordPayload>>,
    ResetPasswordPayload
  >({
    mutationFn: async (payload) => authService.resetPassword(payload),
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!', {
        description: 'Faca login com sua nova senha',
      });
      navigate('SignInScreen');
    },
    onError: (e) => {
      toast.error('Opa!', {
        description: e.response?.data.message || 'Tente novamente ou entre em contato com o suporte.',
      });
    },
  });

  const onSubmit = form.handleSubmit((data: ResetPasswordFormData) => {
    mutate(data);
  });

  const isLoading = status === 'pending';

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" style={{ marginBottom: theme.spacing.s16 }}>
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" style={{ marginBottom: theme.spacing.s32 }}>
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <View style={{ gap: theme.spacing.s20, marginBottom: theme.spacing.s40 }}>
        <ControlledTextInput control={form.control} name="code" label="Código" placeholder="Digite o código do email" />
        <ControlledPasswordInput control={form.control} name="password" label="Senha" placeholder="Digite sua senha" />
        <ControlledPasswordInput
          control={form.control}
          name="passwordConfirmation"
          label="Confirmar senha"
          placeholder="Digite a mesma senha"
        />
      </View>

      <Button loading={isLoading} disabled={!form.formState.isValid} onPress={onSubmit} title="Redefinir senha" />
    </Screen>
  );
};
