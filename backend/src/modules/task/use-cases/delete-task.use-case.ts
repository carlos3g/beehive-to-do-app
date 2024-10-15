import { identifiers } from '@app/config/identifiers';
import { TaskRepositoryContract } from '@app/modules/task/contracts/task.repository.contract';
import { TaskServiceContract } from '@app/modules/task/contracts/task.service.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';

interface DeleteTaskUseCaseInput {
  id: number;
  userId: number;
}

@injectable()
export class DeleteTaskUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.TaskRepositoryContract) private readonly taskRepository: TaskRepositoryContract,
    @inject(identifiers.TaskServiceContract) private readonly taskService: TaskServiceContract
  ) {}

  public async handle(input: DeleteTaskUseCaseInput): Promise<unknown> {
    const { id, userId } = input;

    const task = await this.taskService.findByIdOrFail(id);

    if (task.userId !== userId) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    return this.taskRepository.delete(id);
  }
}
