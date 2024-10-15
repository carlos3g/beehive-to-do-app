import type React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components/native';
import { toast } from 'sonner-native';
import { useRef } from 'react';
import type { Modalize } from 'react-native-modalize';
import type { AppStackNavigationProp, AppStackRouteProp, AppStackScreenProps } from '@/navigation/app.navigator.types';

import { taskService } from '@/features/task/services';
import { Text } from '@/shared/components/ui/text';
import { Button } from '@/shared/components/ui/button';
import { Screen } from '@/shared/components/ui/screen';
import { UpdateTaskModal } from '@/features/task/components/update-task-modal';
import type { UpdateTaskOutput, UpdateTaskPayload } from '@/features/task/contracts/task-service.contract';
import type { ApiResponseError } from '@/types/api';
import type { HttpError } from '@/types/http';

const DetailsContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.s14}px;
  margin-bottom: ${({ theme }) => theme.spacing.s40}px;
`;

const ActionsContainer = styled.View`
  gap: ${({ theme }) => theme.spacing.s8}px;
`;

interface TaskDetailsScreenProps extends AppStackScreenProps<'TaskDetailsScreen'> {}

export const TaskDetailsScreen: React.FC<TaskDetailsScreenProps> = () => {
  const { params } = useRoute<AppStackRouteProp<'TaskDetailsScreen'>>();

  const updateModalRef = useRef<Modalize>(null);
  const queryClient = useQueryClient();
  const { navigate } = useNavigation<AppStackNavigationProp<'TaskDetailsScreen'>>();

  const { mutate: updateMutate, status: updateStatus } = useMutation<
    UpdateTaskOutput,
    HttpError<ApiResponseError<UpdateTaskPayload>>,
    UpdateTaskPayload
  >({
    mutationFn: async (payload) => taskService.update(params.id, payload),
    onSuccess: async () => {
      toast.success('Tarefa marcada como concluída!');
      await queryClient.invalidateQueries({ queryKey: ['task', params.id] });
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (e) => {
      toast.error('Tivemos um problema!', {
        description: e.response?.data.message || 'Tente novamente ou entre em contato com o suporte.',
      });
    },
  });

  const { mutate: deleteMutate, status: deleteStatus } = useMutation({
    mutationFn: async () => taskService.delete(params.id),
    onSuccess: async () => {
      toast.success('Tarefa excluída com sucesso!');
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('TasksScreen');
    },
    onError: () => {
      toast.error('Tivemos um problema!', {
        description: 'Tente novamente ou entre em contato com o suporte.',
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['task', params.id],
    queryFn: async () => taskService.get(params.id),
  });

  if (!data || isLoading) {
    return <Text preset="paragraphLarge">Carregando...</Text>;
  }

  const isUpdating = updateStatus === 'pending';
  const isDeleting = deleteStatus === 'pending';

  const handleDelete = () => {
    deleteMutate();
  };

  const handleUpdate = () => {
    updateModalRef.current?.open();
  };

  const handleMarkAsCompleted = () => {
    updateMutate({ completed: true });
  };

  return (
    <Screen canGoBack>
      <DetailsContainer>
        <Text preset="headingLarge">{data.title}</Text>
        <Text preset="paragraphLarge">{data.description}</Text>

        {data.completed ? (
          <Text preset="paragraphSmall">- Tarefa concluída</Text>
        ) : (
          <Text preset="paragraphSmall">- A Tarefa ainda não foi concluída</Text>
        )}
      </DetailsContainer>

      <ActionsContainer>
        {!data.completed && (
          <Button title="Marcar como concluída" onPress={handleMarkAsCompleted} loading={isUpdating} />
        )}
        <Button preset="outline" title="Atualizar" onPress={handleUpdate} />
        <Button preset="ghost" title="Deletar" onPress={handleDelete} loading={isDeleting} />
      </ActionsContainer>

      <UpdateTaskModal
        task={data}
        ref={updateModalRef}
        onSuccess={() => updateModalRef.current?.close()}
        onClose={() => updateModalRef.current?.close()}
      />
    </Screen>
  );
};
