import { identifiers } from '@app/config/identifiers';
import { PasswordChangeRequestRepositoryContract } from '@app/modules/auth/contracts/password-change-request.repository.contract';
import { inject, injectable } from 'inversify';

@injectable()
export class DeleteUsedPasswordChangeRequestTask {
  public constructor(
    @inject(identifiers.PasswordChangeRequestRepositoryContract)
    private readonly passwordChangeRequestRepository: PasswordChangeRequestRepositoryContract
  ) {}

  public async run(): Promise<void> {
    await this.passwordChangeRequestRepository.deleteInvalid();
  }
}
