import { identifiers } from '@app/config/identifiers';
import { TaskRepositoryContract, UpdateTaskInput } from '@app/modules/task/contracts/task.repository.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { inject, injectable } from 'inversify';

export interface UpdateTaskUseCaseInput {
  id: number;
  data: UpdateTaskInput;
}

@injectable()
export class UpdateTaskUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.TaskRepositoryContract) private readonly taskRepository: TaskRepositoryContract
  ) {}

  public handle(input: UpdateTaskUseCaseInput): Promise<unknown> {
    return this.taskRepository.update(input.id, input.data);
  }
}
