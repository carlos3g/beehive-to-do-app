import type { User } from '@app/modules/user/entities/user.entity';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export abstract class UserRepositoryContract {
  public abstract create(input: CreateUserInput): Promise<User>;

  public abstract update(id: number, input: UpdateUserInput): Promise<boolean>;

  public abstract findById(id: number): Promise<User | null>;

  public abstract findByEmail(email: string): Promise<User | null>;

  public abstract delete(id: number): Promise<boolean>;
}
