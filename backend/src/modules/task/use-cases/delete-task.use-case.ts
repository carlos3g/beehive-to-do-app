import { identifiers } from '@app/config/identifiers';
import { TaskRepositoryContract } from '@app/modules/task/contracts/task.repository.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class DeleteTaskUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.TaskRepositoryContract) private readonly taskRepository: TaskRepositoryContract
  ) {}

  public handle(id: number): Promise<unknown> {
    return this.taskRepository.delete(id);
  }
}
