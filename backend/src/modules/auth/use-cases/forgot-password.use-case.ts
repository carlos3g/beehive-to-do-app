import { identifiers } from '@app/config/identifiers';
import { AuthServiceContract } from '@app/modules/auth/contracts/auth.service.contract';
import { PasswordChangeRequestRepositoryContract } from '@app/modules/auth/contracts/password-change-request.repository.contract';
import { ForgotPasswordPayload } from '@app/modules/auth/dtos/forgot-password-payload';
import { MailerServiceContract } from '@app/modules/mailer/contracts/mailer-service.contract';
import { UserRepositoryContract } from '@app/modules/user/contracts/user.repository.contract';
import { UserServiceContract } from '@app/modules/user/contracts/user.service.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class ForgotPasswordUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.UserRepositoryContract) private readonly userRepository: UserRepositoryContract,
    @inject(identifiers.UserServiceContract) private readonly userService: UserServiceContract,
    @inject(identifiers.AuthServiceContract) private readonly authService: AuthServiceContract,
    @inject(identifiers.PasswordChangeRequestRepositoryContract)
    private readonly passwordChangeRequestRepository: PasswordChangeRequestRepositoryContract,
    @inject(identifiers.MailerServiceContract)
    private readonly mailerService: MailerServiceContract
  ) {}

  public async handle(input: ForgotPasswordPayload): Promise<null> {
    const user = await this.userService.findByEmailOrFail(input.email);

    await this.passwordChangeRequestRepository.deleteMany({
      userId: user.id,
    });

    const { code } = await this.authService.createPasswordChangeRequest({
      userId: user.id,
    });

    // eslint-disable-next-line no-console
    console.log({ code });

    await this.mailerService.sendMail({
      subject: 'Reset your password',
      to: user.email,
      text: `Code: ${code}`,
    });

    return null;
  }
}
