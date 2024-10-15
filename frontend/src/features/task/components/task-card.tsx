import styled from 'styled-components/native';
import { Text } from '@/shared/components/ui/text';
import type { Task } from '@/types/entities';

const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s16}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
`;

const BadgeContainer = styled.View<{ done: boolean }>`
  background-color: ${({ theme, done }) => (done ? theme.colors.primary : theme.colors.carrotSecondary)};
  padding: 6px;
  border-radius: 20px;
`;

const BadgeText = styled(Text)`
  color: white;
`;

interface TaskCardProps {
  data: Task;
  onPress: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { data, onPress } = props;

  return (
    <CardContainer onPress={onPress}>
      <Text preset="paragraphMedium">{data.title}</Text>

      <BadgeContainer done={data.completed}>
        <BadgeText preset="paragraphCaption">{data.completed ? 'Concluída' : 'Pendente'}</BadgeText>
      </BadgeContainer>
    </CardContainer>
  );
};
