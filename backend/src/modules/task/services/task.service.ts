import { identifiers } from '@app/config/identifiers';
import { TaskRepositoryContract, UpdateTaskInput } from '@app/modules/task/contracts/task.repository.contract';
import { ListPaginatedTasksInput, TaskServiceContract } from '@app/modules/task/contracts/task.service.contract';
import { Task } from '@app/modules/task/entities/task.entity';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { calcSkip, getMeta } from '@app/shared/helpers/pagination';
import { PaginatedResult } from '@app/shared/interface/pagination';
import { inject, injectable } from 'inversify';

@injectable()
export class TaskService implements TaskServiceContract {
  public constructor(
    @inject(identifiers.TaskRepositoryContract) private readonly taskRepository: TaskRepositoryContract
  ) {}

  public async listPaginatedTasks(input: ListPaginatedTasksInput): Promise<PaginatedResult<Task>> {
    const [total, data] = await Promise.all([
      this.taskRepository.count(input.where),
      this.taskRepository.findMany({
        ...input,
        options: {
          skip: calcSkip({ ...input.options }),
          take: input.options.perPage,
        },
      }),
    ]);

    return {
      data,
      meta: getMeta({
        total,
        ...input.options,
      }),
    };
  }

  public async update(id: number, input: UpdateTaskInput): Promise<Task> {
    await this.taskRepository.update(id, input);

    return this.findByIdOrFail(id);
  }

  public async findByIdOrFail(id: number): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Task not found');
    }

    return task;
  }
}
