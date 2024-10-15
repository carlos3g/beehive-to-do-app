import type { z } from 'zod';
import type { createTaskFormSchema, updateTaskFormSchema } from '@/features/task/validations';
import type { ApiPaginatedResult, Paginate } from '@/types/api';
import type { Task } from '@/types/entities';

export type CreateTaskPayload = z.infer<typeof createTaskFormSchema>;

export type CreateTaskOutput = Task;

export type UpdateTaskPayload = z.infer<typeof updateTaskFormSchema>;

export type UpdateTaskOutput = Task;

export type GetTaskPayload = unknown;

export type GetTaskOutput = Task;

export type ListTasksPayload = {
  paginate?: Paginate;
};

export type ListTasksOutput = ApiPaginatedResult<Task>;

export abstract class TaskServiceContract {
  public abstract create(payload: CreateTaskPayload): Promise<CreateTaskOutput>;

  public abstract update(id: number, payload: UpdateTaskPayload): Promise<UpdateTaskOutput>;

  public abstract get(id: number): Promise<GetTaskOutput>;

  public abstract list(payload: ListTasksPayload): Promise<ListTasksOutput>;

  public abstract delete(id: number): Promise<unknown>;
}
