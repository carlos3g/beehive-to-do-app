import type { UpdateTaskInput } from '@app/modules/task/contracts/task.repository.contract';
import type { FilterTasksQuery } from '@app/modules/task/dtos/filter-tasks-query';
import type { Task } from '@app/modules/task/entities/task.entity';
import type { PaginatedResult } from '@app/shared/interface/pagination';

export interface ListPaginatedTasksInput {
  where?: FilterTasksQuery;
  options: {
    perPage: number;
    page: number;
  };
}

export abstract class TaskServiceContract {
  public abstract listPaginatedTasks(input: ListPaginatedTasksInput): Promise<PaginatedResult<Task>>;

  public abstract update(id: number, input: UpdateTaskInput): Promise<Task>;

  public abstract findByIdOrFail(id: number): Promise<Task>;
}
