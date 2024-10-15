import { identifiers } from '@app/config/identifiers';
import { TaskRepositoryContract } from '@app/modules/task/contracts/task.repository.contract';
import { CreateTaskPayload } from '@app/modules/task/dtos/create-task-payload';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class CreateTaskUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.TaskRepositoryContract) private readonly taskRepository: TaskRepositoryContract
  ) {}

  public handle(input: CreateTaskPayload): Promise<unknown> {
    return this.taskRepository.create(input);
  }
}
