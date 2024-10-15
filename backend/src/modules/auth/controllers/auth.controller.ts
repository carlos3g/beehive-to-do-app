import { identifiers } from '@app/config/identifiers';
import { ForgotPasswordRequest, ResetPasswordRequest, SignInRequest, SignUpRequest } from '@app/modules/auth/types';
import { ForgotPasswordUseCase } from '@app/modules/auth/use-cases/forgot-password.use-case';
import { RefreshTokenUseCase } from '@app/modules/auth/use-cases/refresh-token.use-case';
import { ResetPasswordUseCase } from '@app/modules/auth/use-cases/reset-password.use-case';
import { SignInUseCase } from '@app/modules/auth/use-cases/sign-in.use-case';
import { SignUpUseCase } from '@app/modules/auth/use-cases/sign-up.use-case';
import { UserServiceContract } from '@app/modules/user/contracts/user.service.contract';
import { HttpStatus } from '@app/shared/enums/http';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class AuthController {
  public constructor(
    @inject(identifiers.SignInUseCase) private readonly signInUseCase: SignInUseCase,
    @inject(identifiers.SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,
    @inject(identifiers.RefreshTokenUseCase) private readonly refreshTokenUseCase: RefreshTokenUseCase,
    @inject(identifiers.ForgotPasswordUseCase) private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    @inject(identifiers.ResetPasswordUseCase) private readonly resetPasswordUseCase: ResetPasswordUseCase,
    @inject(identifiers.UserServiceContract) private readonly userService: UserServiceContract
  ) {}

  public async signIn(req: SignInRequest, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json(await this.signInUseCase.handle(req.body));
  }

  public async signUp(req: SignUpRequest, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json(await this.signUpUseCase.handle(req.body));
  }

  public refreshToken(req: Request, res: Response): void {
    res.status(HttpStatus.OK).json(this.refreshTokenUseCase.handle({ userId: req.auth!.userId }));
  }

  public async forgotPassword(req: ForgotPasswordRequest, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json(await this.forgotPasswordUseCase.handle(req.body));
  }

  public async resetPassword(req: ResetPasswordRequest, res: Response): Promise<void> {
    res.status(HttpStatus.OK).json(await this.resetPasswordUseCase.handle(req.body));
  }

  public async me(req: Request, res: Response): Promise<void> {
    const { password: _, ...user } = await this.userService.findByIdOrFail(req.auth!.userId);
    res.status(HttpStatus.OK).json({ user });
  }
}
