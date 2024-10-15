import { identifiers } from '@app/config/identifiers';
import { TaskRepositoryContract, UpdateTaskInput } from '@app/modules/task/contracts/task.repository.contract';
import { TaskServiceContract } from '@app/modules/task/contracts/task.service.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';

export interface UpdateTaskUseCaseInput {
  id: number;
  data: UpdateTaskInput;
  userId: number;
}

@injectable()
export class UpdateTaskUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.TaskRepositoryContract) private readonly taskRepository: TaskRepositoryContract,
    @inject(identifiers.TaskServiceContract) private readonly taskService: TaskServiceContract
  ) {}

  public async handle(input: UpdateTaskUseCaseInput): Promise<unknown> {
    const task = await this.taskService.findByIdOrFail(input.id);

    if (task.userId !== input.userId) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    return this.taskRepository.update(input.id, {
      ...input.data,
      completedAt: input.data.completed ? new Date() : undefined,
    });
  }
}
