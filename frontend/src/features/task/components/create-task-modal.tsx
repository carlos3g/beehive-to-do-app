import { Portal } from 'react-native-portalize';
import type { ModalizeProps } from 'react-native-modalize';
import { Modalize } from 'react-native-modalize';
import { forwardRef } from 'react';
import type { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner-native';
import { createTaskFormSchema } from '@/features/task/validations';
import { ControlledTextInput } from '@/shared/components/form/controlled-text-input';
import type { CreateTaskOutput, CreateTaskPayload } from '@/features/task/contracts/task-service.contract';
import type { HttpError } from '@/types/http';
import type { ApiResponseError } from '@/types/api';
import { taskService } from '@/features/task/services';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { Button } from '@/shared/components/ui/button';

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.s16}px;
`;

const InputsContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.s8}px;
`;

type ModalRef = Modalize;

interface CreateTaskModalProps extends ModalizeProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const CreateTaskModal = forwardRef<ModalRef, CreateTaskModalProps>((props, ref) => {
  const { onSuccess, onClose, ...rest } = props;

  const theme = useAppTheme();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    mode: 'onChange',
  });

  const { mutate, status } = useMutation<
    CreateTaskOutput,
    HttpError<ApiResponseError<CreateTaskPayload>>,
    CreateTaskPayload
  >({
    mutationFn: async (payload) => taskService.create(payload),
    onSuccess: async () => {
      toast.success('Tarefa criada!');
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onSuccess?.();
    },
    onError: (e) => {
      toast.error('Tivemos um problema!', {
        description: e.response?.data.message || 'Tente novamente ou entre em contato com o suporte.',
      });
    },
  });

  const onSubmit = form.handleSubmit((data: z.infer<typeof createTaskFormSchema>) => {
    mutate(data);
  });

  const isLoading = status === 'pending';

  return (
    <Portal>
      <Modalize {...rest} ref={ref}>
        <Container>
          <InputsContainer>
            <ControlledTextInput control={form.control} name="title" label="Título" placeholder="Título da tarefa" />

            <ControlledTextInput
              control={form.control}
              name="description"
              label="Descrição"
              placeholder="Descrição da tarefa"
            />
          </InputsContainer>

          <Button
            loading={isLoading}
            disabled={!form.formState.isValid}
            onPress={onSubmit}
            title="Criar"
            style={{ marginBottom: theme.spacing.s8, marginTop: theme.spacing.s40 }}
          />

          <Button preset="ghost" onPress={() => onClose?.()} title="Fechar" />
        </Container>
      </Modalize>
    </Portal>
  );
});
