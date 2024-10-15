import { identifiers } from '@app/config/identifiers';
import {
  CreateUserInput,
  UpdateUserInput,
  UserRepositoryContract,
} from '@app/modules/user/contracts/user.repository.contract';
import { User } from '@app/modules/user/entities/user.entity';
import { TypeormServiceContract } from '@app/shared/contracts/typeorm.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class TypeormUserRepository implements UserRepositoryContract {
  public constructor(
    @inject(identifiers.TypeormServiceContract) private readonly typeormService: TypeormServiceContract
  ) {}

  public async create(input: CreateUserInput): Promise<User> {
    return this.typeormService.getRepository(User).save(input);
  }

  public async update(id: number, input: UpdateUserInput): Promise<boolean> {
    const { affected } = await this.typeormService.getRepository(User).update(id, input);
    return !!affected;
  }

  public findById(id: number): Promise<User | null> {
    return this.typeormService.getRepository(User).findOne({ where: { id } });
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.typeormService.getRepository(User).findOne({ where: { email } });
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.typeormService.getRepository(User).delete(id);
    return !!affected;
  }
}
