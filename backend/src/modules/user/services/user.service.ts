import { identifiers } from '@app/config/identifiers';
import { UpdateUserInput, UserRepositoryContract } from '@app/modules/user/contracts/user.repository.contract';
import { UserServiceContract } from '@app/modules/user/contracts/user.service.contract';
import { User } from '@app/modules/user/entities/user.entity';
import { HashServiceContract } from '@app/shared/contracts/hash-service.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { HttpException } from '@app/shared/exceptions/base-http.exception';
import { inject, injectable } from 'inversify';

@injectable()
export class UserService implements UserServiceContract {
  public constructor(
    @inject(identifiers.UserRepositoryContract) private readonly userRepository: UserRepositoryContract,
    @inject(identifiers.HashServiceContract) private readonly hashService: HashServiceContract
  ) {}

  public async update(id: number, input: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, input);

    return this.findByIdOrFail(id);
  }

  public changePassword(id: number, input: { password: string }): Promise<boolean> {
    const hashedPassword = this.hashService.hash(input.password);

    return this.userRepository.update(id, {
      password: hashedPassword,
    });
  }

  public async findByIdOrFail(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }

    return user;
  }

  public async findByEmailOrFail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'User not found');
    }

    return user;
  }
}
