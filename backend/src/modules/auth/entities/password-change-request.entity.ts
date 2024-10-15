import { User } from '@app/modules/user/entities/user.entity';
import { BaseEntity } from '@app/shared/abstracts/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('password_change_requests')
export class PasswordChangeRequest extends BaseEntity {
  @Column('varchar', { length: 255 })
  public code!: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @Column({
    name: 'user_id',
    type: 'int',
  })
  public userId!: number;

  @Column({
    type: 'timestamp',
    name: 'used_at',
    nullable: true,
  })
  public usedAt!: Date | null;

  @Column({
    type: 'timestamp',
    name: 'expires_at',
  })
  public expiresAt!: Date;
}
