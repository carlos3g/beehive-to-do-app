import { identifiers } from '@app/config/identifiers';
import {
  CreatePasswordChangeRequestInput,
  DeleteManyInput,
  PasswordChangeRequestRepositoryContract,
  UpdatePasswordChangeRequestInput,
} from '@app/modules/auth/contracts/password-change-request.repository.contract';
import { PasswordChangeRequest } from '@app/modules/auth/entities/password-change-request.entity';
import { TypeormServiceContract } from '@app/shared/contracts/typeorm.contract';
import { inject, injectable } from 'inversify';
import { DateTime } from 'luxon';
import { IsNull, LessThan, MoreThan } from 'typeorm';

@injectable()
export class TypeormPasswordChangeRequestRepository implements PasswordChangeRequestRepositoryContract {
  public constructor(
    @inject(identifiers.TypeormServiceContract) private readonly typeormService: TypeormServiceContract
  ) {}

  public async create(input: CreatePasswordChangeRequestInput): Promise<PasswordChangeRequest> {
    return this.typeormService.getRepository(PasswordChangeRequest).save(input);
  }

  public async update(code: string, input: UpdatePasswordChangeRequestInput): Promise<boolean> {
    const { affected } = await this.typeormService.getRepository(PasswordChangeRequest).update(code, input);
    return !!affected;
  }

  public findByCode(code: string): Promise<PasswordChangeRequest | null> {
    return this.typeormService.getRepository(PasswordChangeRequest).findOne({ where: { code } });
  }

  public async deleteMany(input: DeleteManyInput): Promise<boolean> {
    const { affected } = await this.typeormService.getRepository(PasswordChangeRequest).delete(input);
    return !!affected;
  }

  public async deleteInvalid(): Promise<boolean> {
    const entities = await this.typeormService.getRepository(PasswordChangeRequest).find({
      where: [
        {
          usedAt: IsNull(),
        },
        {
          expiresAt: LessThan(DateTime.now().toJSDate()),
        },
      ],
    });

    const removed = await this.typeormService.getRepository(PasswordChangeRequest).remove(entities);

    return removed.length > 0;
  }

  public findFirstValidByUserId(userId: number): Promise<PasswordChangeRequest | null> {
    return this.typeormService.getRepository(PasswordChangeRequest).findOne({
      where: {
        userId,
        usedAt: IsNull(),
        expiresAt: MoreThan(DateTime.now().toJSDate()),
      },
    });
  }

  public findFirstValidByCode(code: string): Promise<PasswordChangeRequest | null> {
    return this.typeormService.getRepository(PasswordChangeRequest).findOne({
      where: {
        code,
        usedAt: IsNull(),
        expiresAt: MoreThan(DateTime.now().toJSDate()),
      },
    });
  }
}
