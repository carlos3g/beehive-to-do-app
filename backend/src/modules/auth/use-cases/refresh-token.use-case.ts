import { identifiers } from '@app/config/identifiers';
import { AuthServiceContract } from '@app/modules/auth/contracts/auth.service.contract';
import { RefreshTokenPayload } from '@app/modules/auth/dtos/refresh-token-payload';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class RefreshTokenUseCase implements UseCaseHandlerContract {
  public constructor(@inject(identifiers.AuthServiceContract) private readonly authService: AuthServiceContract) {}

  public handle(input: RefreshTokenPayload): { accessToken: string; refreshToken: string } {
    return this.authService.generateAuthTokens(input.userId);
  }
}
