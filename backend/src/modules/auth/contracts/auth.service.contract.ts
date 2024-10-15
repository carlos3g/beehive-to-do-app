import type { PasswordChangeRequest } from '@app/modules/auth/entities/password-change-request.entity';

export abstract class AuthServiceContract {
  public abstract generateAuthTokens(userId: number): {
    accessToken: string;
    refreshToken: string;
  };

  public abstract createPasswordChangeRequest(args: { userId: number }): Promise<{ code: string }>;

  public abstract findByCodeOrFail(code: string): Promise<PasswordChangeRequest>;
}
