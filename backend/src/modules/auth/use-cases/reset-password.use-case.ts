import { identifiers } from '@app/config/identifiers';
import { PasswordChangeRequestRepositoryContract } from '@app/modules/auth/contracts/password-change-request.repository.contract';
import { ResetPasswordPayload } from '@app/modules/auth/dtos/reset-password-payload';
import { UserServiceContract } from '@app/modules/user/contracts/user.service.contract';
import { HashServiceContract } from '@app/shared/contracts/hash-service.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';
import { DateTime } from 'luxon';

@injectable()
export class ResetPasswordUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.UserServiceContract) private readonly userService: UserServiceContract,
    @inject(identifiers.PasswordChangeRequestRepositoryContract)
    private readonly passwordChangeRequestRepository: PasswordChangeRequestRepositoryContract
  ) {}

  public async handle(input: ResetPasswordPayload): Promise<null> {
    const passwordChangeRequest = await this.passwordChangeRequestRepository.findFirstValidByCode(input.code);

    if (!passwordChangeRequest) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Código errado');
    }

    await this.passwordChangeRequestRepository.update(passwordChangeRequest.code, {
      usedAt: DateTime.now().toJSDate(),
    });

    await this.userService.changePassword(passwordChangeRequest.userId, {
      password: input.password,
    });

    return null;
  }
}
