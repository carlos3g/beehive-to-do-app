import type { PasswordChangeRequest } from '@app/modules/auth/entities/password-change-request.entity';

export interface CreatePasswordChangeRequestInput {
  code: string;
  userId: number;
  expiresAt: Date;
}

export interface UpdatePasswordChangeRequestInput {
  usedAt?: Date;
}

export interface DeleteManyInput {
  userId: number;
}

export abstract class PasswordChangeRequestRepositoryContract {
  public abstract create(input: CreatePasswordChangeRequestInput): Promise<PasswordChangeRequest>;

  public abstract update(code: string, input: UpdatePasswordChangeRequestInput): Promise<boolean>;

  public abstract findByCode(code: string): Promise<PasswordChangeRequest | null>;

  public abstract findFirstValidByUserId(userId: number): Promise<PasswordChangeRequest | null>;

  public abstract findFirstValidByCode(code: string): Promise<PasswordChangeRequest | null>;

  public abstract deleteInvalid(): Promise<boolean>;

  public abstract deleteMany(input: DeleteManyInput): Promise<boolean>;
}
