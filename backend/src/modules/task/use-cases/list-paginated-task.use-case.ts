import { identifiers } from '@app/config/identifiers';
import { paginationConfig } from '@app/config/pagination';
import { TaskServiceContract } from '@app/modules/task/contracts/task.service.contract';
import { ListPaginatedTasksQuery } from '@app/modules/task/dtos/list-paginated-tasks-query';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class ListPaginatedTaskUseCase implements UseCaseHandlerContract {
  public constructor(@inject(identifiers.TaskServiceContract) private readonly taskService: TaskServiceContract) {}

  public handle(input: ListPaginatedTasksQuery): Promise<unknown> {
    return this.taskService.listPaginatedTasks({
      where: input.filters,
      options: {
        page: input.paginate?.page || paginationConfig.defaults.page,
        perPage: input.paginate?.perPage || paginationConfig.defaults.perPage,
      },
    });
  }
}
