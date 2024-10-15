import type { DecodeOptions, SignOptions } from 'jsonwebtoken';

export abstract class JwtServiceContract {
  public abstract sign(payload: object, options?: SignOptions): string;
  public abstract verify<T extends object = any>(token: string, options?: SignOptions): T;
  public abstract decode<T = any>(token: string, options?: DecodeOptions): T;
}
