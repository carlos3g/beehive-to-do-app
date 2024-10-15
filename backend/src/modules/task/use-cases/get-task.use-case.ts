import { identifiers } from '@app/config/identifiers';
import { TaskServiceContract } from '@app/modules/task/contracts/task.service.contract';
import { Task } from '@app/modules/task/entities/task.entity';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class GetTaskUseCase implements UseCaseHandlerContract {
  public constructor(@inject(identifiers.TaskServiceContract) private readonly taskService: TaskServiceContract) {}

  public async handle(id: number): Promise<Task> {
    return this.taskService.findByIdOrFail(id);
  }
}
