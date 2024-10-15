import type { EnvVariables } from '@app/shared/types/env';

declare global {
  declare namespace NodeJS {
    interface ProcessEnv extends EnvVariables {}
  }

  interface ObjectConstructor {
    entries<T extends object>(o: T): Entries<T>;

    keys<T extends object>(object: T): (keyof T)[];
  }

  declare namespace Express {
    interface Request {
      auth?: {
        userId: number;
      };
    }
  }
}
