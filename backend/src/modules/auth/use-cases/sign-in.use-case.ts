import { identifiers } from '@app/config/identifiers';
import { AuthServiceContract } from '@app/modules/auth/contracts/auth.service.contract';
import { SignInPayload } from '@app/modules/auth/dtos/sign-in-payload';
import { UserRepositoryContract } from '@app/modules/user/contracts/user.repository.contract';
import { User } from '@app/modules/user/entities/user.entity';
import { HashServiceContract } from '@app/shared/contracts/hash-service.contract';
import { JwtServiceContract } from '@app/shared/contracts/jwt-service.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';

@injectable()
export class SignInUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.JwtServiceContract) private readonly jwtService: JwtServiceContract,
    @inject(identifiers.HashServiceContract) private readonly hashService: HashServiceContract,
    @inject(identifiers.UserRepositoryContract) private readonly userRepository: UserRepositoryContract,
    @inject(identifiers.AuthServiceContract) private readonly authService: AuthServiceContract
  ) {}

  public async handle(input: SignInPayload): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      // For privacy reasons, we don't inform if the user doesn't exist
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    if (!this.hashService.compare(input.password, user.password)) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    return {
      user,
      ...this.authService.generateAuthTokens(user.id),
    };
  }
}
