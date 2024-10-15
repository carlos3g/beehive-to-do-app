import { HashServiceContract } from '@app/shared/contracts/hash-service.contract';
import * as bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class BCryptService implements HashServiceContract {
  public compare(value: string, hash: string): boolean {
    return bcrypt.compareSync(value, hash);
  }

  public hash(value: string): string {
    return bcrypt.hashSync(value, 10);
  }
}
