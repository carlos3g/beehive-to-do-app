import type { ApiPaginatedResult, Paginate } from '@/types/api';
import type { Task } from '@/types/entities';

export type GetTaskPayload = unknown;

export type GetTaskOutput = Task;

export type ListTasksPayload = {
  paginate?: Paginate;
};

export type ListTasksOutput = ApiPaginatedResult<Task>;

export abstract class TaskServiceContract {
  public abstract get(uuid: string): Promise<GetTaskOutput>;

  public abstract list(payload: ListTasksPayload): Promise<ListTasksOutput>;
}
