import type { EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export abstract class TypeormServiceContract {
  public abstract getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T>;
}
