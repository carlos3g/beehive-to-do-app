import type { Task } from '@app/modules/task/entities/task.entity';

export interface CreateTaskInput {
  title: string;
  description: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  completedAt?: Date | null;
}

export interface CountTasksInput {
  description?: string;
}

export interface FindManyInput {
  where?: {
    title?: string;
    description?: string;
    completed?: boolean;
  };
  options?: {
    take?: number;
    skip?: number;
  };
}

export abstract class TaskRepositoryContract {
  public abstract create(input: CreateTaskInput): Promise<Task>;

  public abstract update(id: number, input: UpdateTaskInput): Promise<boolean>;

  public abstract findById(id: number): Promise<Task | null>;

  public abstract findMany(input: FindManyInput): Promise<Task[]>;

  public abstract delete(id: number): Promise<boolean>;

  public abstract count(input?: CountTasksInput): Promise<number>;
}
