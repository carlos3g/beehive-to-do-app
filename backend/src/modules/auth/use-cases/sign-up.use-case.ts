import { identifiers } from '@app/config/identifiers';
import { SignUpPayload } from '@app/modules/auth/dtos/sign-up-payload';
import { UserRepositoryContract } from '@app/modules/user/contracts/user.repository.contract';
import { User } from '@app/modules/user/entities/user.entity';
import { HashServiceContract } from '@app/shared/contracts/hash-service.contract';
import { UseCaseHandlerContract } from '@app/shared/contracts/use-case-handler.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';

@injectable()
export class SignUpUseCase implements UseCaseHandlerContract {
  public constructor(
    @inject(identifiers.UserRepositoryContract) private readonly userRepository: UserRepositoryContract,
    @inject(identifiers.HashServiceContract) private readonly hashService: HashServiceContract
  ) {}

  public async handle(input: SignUpPayload): Promise<{ user: User }> {
    await this.validateEmail(input.email);

    const hashedPassword = this.hashService.hash(input.password);

    const user = await this.userRepository.create({
      email: input.email,
      name: input.name,
      password: hashedPassword,
    });

    return {
      user,
    };
  }

  public async validateEmail(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new HttpException(HttpStatus.CONFLICT, 'Email already in use');
    }
  }
}
