import { identifiers } from '@app/config/identifiers';
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  GetTaskRequest,
  ListPaginatedTasksRequest,
  UpdateTaskRequest,
} from '@app/modules/task/types/requests';
import { CreateTaskUseCase } from '@app/modules/task/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '@app/modules/task/use-cases/delete-task.use-case';
import { GetTaskUseCase } from '@app/modules/task/use-cases/get-task.use-case';
import { ListPaginatedTaskUseCase } from '@app/modules/task/use-cases/list-paginated-task.use-case';
import { UpdateTaskUseCase } from '@app/modules/task/use-cases/update-task.use-case';
import { HttpStatus } from '@app/shared/enums/http';
import { Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class TaskController {
  public constructor(
    @inject(identifiers.CreateTaskUseCase) private readonly createTaskUseCase: CreateTaskUseCase,
    @inject(identifiers.UpdateTaskUseCase) private readonly updateTaskUseCase: UpdateTaskUseCase,
    @inject(identifiers.GetTaskUseCase) private readonly getTaskUseCase: GetTaskUseCase,
    @inject(identifiers.ListPaginatedTaskUseCase) private readonly listPaginatedTaskUseCase: ListPaginatedTaskUseCase,
    @inject(identifiers.DeleteTaskUseCase) private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  public async index(req: ListPaginatedTasksRequest, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json(await this.listPaginatedTaskUseCase.handle(req.query));
  }

  public async show(req: GetTaskRequest, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json(await this.getTaskUseCase.handle(req.params.id));
  }

  public async store(req: CreateTaskRequest, res: Response): Promise<void> {
    res.status(HttpStatus.CREATED).json(await this.createTaskUseCase.handle(req.body));
  }

  public async update(req: UpdateTaskRequest, res: Response): Promise<void> {
    res.status(HttpStatus.NO_CONTENT).json(await this.updateTaskUseCase.handle({ id: req.params.id, data: req.body }));
  }

  public async destroy(req: DeleteTaskRequest, res: Response): Promise<void> {
    res.status(HttpStatus.NO_CONTENT).json(await this.deleteTaskUseCase.handle(req.params.id));
  }
}
