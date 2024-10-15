import { RefreshControl } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import styled from 'styled-components/native';
import type { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@/shared/components/ui/screen';
import { Button } from '@/shared/components/ui/button';
import { taskService } from '@/features/task/services';
import type { Task } from '@/types/entities';
import { CreateTaskModal } from '@/features/task/components/create-task-modal';
import { Text } from '@/shared/components/ui/text';
import type { AppStackNavigationProp } from '@/navigation/app.navigator.types';
import { TaskCard } from '@/features/task/components/task-card';

const ItemSeparatorComponent = styled.View`
  margin-bottom: 4px;
`;

const ListEmptyComponent = () => <Text preset="paragraphLarge">Nenhuma tarefa encontrada</Text>;

export const TasksScreen = () => {
  const createModalRef = useRef<Modalize>(null);

  const { navigate } = useNavigation<AppStackNavigationProp<'TasksScreen'>>();

  const { data, fetchNextPage, isRefetching, refetch } = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: async ({ pageParam }) =>
      taskService.list({
        paginate: { page: pageParam },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _) => (lastPage.meta.next ? lastPage.meta.next : undefined),
  });

  const tasks: Task[] = useMemo(() => data?.pages.map((page) => page.data).flat() || [], [data]);

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={isRefetching} onRefresh={refetch} />,
    [isRefetching, refetch]
  );

  return (
    <Screen>
      <Button title="Criar nova tarefa" onPress={() => createModalRef.current?.open()} style={{ marginBottom: 16 }} />

      <FlashList
        data={tasks}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => (
          <TaskCard data={item} onPress={() => navigate('TaskDetailsScreen', { id: item.id })} />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        refreshControl={refreshControl}
        ListEmptyComponent={ListEmptyComponent}
      />

      <CreateTaskModal
        ref={createModalRef}
        onSuccess={() => createModalRef.current?.close()}
        onClose={() => createModalRef.current?.close()}
      />
    </Screen>
  );
};
