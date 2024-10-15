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
import type { UpdateTaskOutput, UpdateTaskPayload } from '@/features/task/contracts/task-service.contract';
import type { HttpError } from '@/types/http';
import type { ApiResponseError } from '@/types/api';
import { taskService } from '@/features/task/services';
import { useAppTheme } from '@/shared/hooks/use-app-theme';
import { Button } from '@/shared/components/ui/button';
import type { Task } from '@/types/entities';

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.s16}px;
`;

const InputsContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.s8}px;
`;

type ModalRef = Modalize;

interface UpdateTaskModalProps extends ModalizeProps {
  task: Task;
  onSuccess?: () => void;
  onClose?: () => void;
}

export const UpdateTaskModal = forwardRef<ModalRef, UpdateTaskModalProps>((props, ref) => {
  const { onSuccess, onClose, task, ...rest } = props;

  const theme = useAppTheme();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const { mutate, status } = useMutation<
    UpdateTaskOutput,
    HttpError<ApiResponseError<UpdateTaskPayload>>,
    UpdateTaskPayload
  >({
    mutationFn: async (payload) => taskService.update(task.id, payload),
    onSuccess: async () => {
      toast.success('Tarefa atualizada!');
      await queryClient.invalidateQueries({ queryKey: ['task', task.id] });
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
            title="Atualizar"
            style={{ marginBottom: theme.spacing.s8, marginTop: theme.spacing.s40 }}
          />

          <Button preset="ghost" onPress={() => onClose?.()} title="Fechar" />
        </Container>
      </Modalize>
    </Portal>
  );
});
