import type { UpdateUserInput } from '@app/modules/user/contracts/user.repository.contract';
import type { User } from '@app/modules/user/entities/user.entity';

export abstract class UserServiceContract {
  public abstract update(id: number, input: UpdateUserInput): Promise<User>;

  public abstract changePassword(id: number, input: { password: string }): Promise<boolean>;

  public abstract findByIdOrFail(id: number): Promise<User>;

  public abstract findByEmailOrFail(email: string): Promise<User>;
}
