import { AppDataSource } from '@app/config/typeorm';
import { TypeormServiceContract } from '@app/shared/contracts/typeorm.contract';
import { injectable } from 'inversify';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

@injectable()
export class TypeormService implements TypeormServiceContract {
  private getDataSource(): DataSource {
    return AppDataSource;
  }

  public getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    const dataSource = this.getDataSource();
    return dataSource.getRepository<T>(entity);
  }
}
