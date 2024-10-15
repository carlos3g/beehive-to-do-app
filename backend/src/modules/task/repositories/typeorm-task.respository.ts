import { identifiers } from '@app/config/identifiers';
import {
  CountTasksInput,
  CreateTaskInput,
  FindManyInput,
  TaskRepositoryContract,
  UpdateTaskInput,
} from '@app/modules/task/contracts/task.repository.contract';
import { Task } from '@app/modules/task/entities/task.entity';
import { TypeormServiceContract } from '@app/shared/contracts/typeorm.contract';
import { inject, injectable } from 'inversify';
import { ILike } from 'typeorm';

@injectable()
export class TypeormTaskRepository implements TaskRepositoryContract {
  public constructor(
    @inject(identifiers.TypeormServiceContract) private readonly typeormService: TypeormServiceContract
  ) {}

  public async create(input: CreateTaskInput): Promise<Task> {
    return this.typeormService.getRepository(Task).save(input);
  }

  public async update(id: number, input: UpdateTaskInput): Promise<boolean> {
    const { affected } = await this.typeormService.getRepository(Task).update(id, input);
    return !!affected;
  }

  public findById(id: number): Promise<Task | null> {
    return this.typeormService.getRepository(Task).findOne({ where: { id } });
  }

  public findMany(input: FindManyInput): Promise<Task[]> {
    const { options = {}, where = {} } = input;
    return this.typeormService.getRepository(Task).find({
      where: {
        completed: where.completed,
        description: where.description && ILike(`%${where.description}%`),
        title: where.title && ILike(`%${where.title}%`),
      },
      ...options,
    });
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.typeormService.getRepository(Task).delete(id);
    return !!affected;
  }

  public count(input: CountTasksInput): Promise<number> {
    return this.typeormService.getRepository(Task).count({ where: input });
  }
}
