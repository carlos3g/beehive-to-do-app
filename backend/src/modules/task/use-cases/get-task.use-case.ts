import { identifiers } from '@app/config/identifiers';
import { TaskServiceContract } from '@app/modules/task/contracts/task.service.contract';
import { Task } from '@app/modules/task/entities/task.entity';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';

interface GetTaskUseCaseInput {
  id: number;
  userId: number;
}

@injectable()
export class GetTaskUseCase implements UseCaseHandlerContract {
  public constructor(@inject(identifiers.TaskServiceContract) private readonly taskService: TaskServiceContract) {}

  public async handle(input: GetTaskUseCaseInput): Promise<Task> {
    const { id, userId } = input;

    const task = await this.taskService.findByIdOrFail(id);

    if (task.userId !== userId) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    return task;
  }
}
