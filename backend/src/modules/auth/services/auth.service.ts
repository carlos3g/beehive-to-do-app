import { identifiers } from '@app/config/identifiers';
import { AuthServiceContract } from '@app/modules/auth/contracts/auth.service.contract';
import { PasswordChangeRequestRepositoryContract } from '@app/modules/auth/contracts/password-change-request.repository.contract';
import { PasswordChangeRequest } from '@app/modules/auth/entities/password-change-request.entity';
import { HashServiceContract } from '@app/shared/contracts/hash-service.contract';
import { JwtServiceContract } from '@app/shared/contracts/jwt-service.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';
import { DateTime } from 'luxon';

const generateSixDigitCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

@injectable()
export class AuthService implements AuthServiceContract {
  public constructor(
    @inject(identifiers.PasswordChangeRequestRepositoryContract)
    private readonly passwordChangeRequestRepository: PasswordChangeRequestRepositoryContract,
    @inject(identifiers.HashServiceContract)
    private readonly hashService: HashServiceContract,
    @inject(identifiers.JwtServiceContract)
    private readonly jwtService: JwtServiceContract
  ) {}

  public generateAuthTokens(userId: number): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.jwtService.sign({ userId }, { expiresIn: '7d' }),
      refreshToken: this.jwtService.sign({ userId }, { expiresIn: '21d' }),
    };
  }

  public async createPasswordChangeRequest(args: { userId: number }): Promise<{ code: string }> {
    const unhashedCode = generateSixDigitCode();

    await this.passwordChangeRequestRepository.create({
      expiresAt: DateTime.now().plus({ days: 1 }).toJSDate(),
      userId: args.userId,
      code: this.hashService.hash(unhashedCode),
    });

    return {
      code: unhashedCode,
    };
  }

  public async findByCodeOrFail(code: string): Promise<PasswordChangeRequest> {
    const entity = await this.passwordChangeRequestRepository.findByCode(code);

    if (!entity) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Request not found');
    }

    return entity;
  }
}
