import { JwtServiceContract } from '@app/shared/contracts/jwt-service.contract';
import { EnvService } from '@app/shared/services/env.service';
import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';

@injectable()
export class JwtService implements JwtServiceContract {
  public sign(payload: object, options?: jwt.SignOptions): string {
    return jwt.sign(payload, EnvService.BEEHIVE_JWT_SECRET, options);
  }

  public decode<T = any>(token: string, options?: jwt.DecodeOptions): T {
    return jwt.decode(token, options) as T;
  }

  public verify<T extends object = any>(token: string, options?: jwt.SignOptions): T {
    return jwt.verify(token, EnvService.BEEHIVE_JWT_SECRET, options) as T;
  }
}
