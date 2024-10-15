import { User } from '@app/modules/user/entities/user.entity';
import { BaseEntity } from '@app/shared/abstracts/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column('varchar', { length: 255 })
  public title!: string;

  @Column('text')
  public description!: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  public completed!: boolean;

  @Column({
    type: 'timestamp',
    name: 'completed_at',
    nullable: true,
  })
  public completedAt!: Date | null;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  public user!: User;

  @Column({
    name: 'user_id',
    type: 'int',
  })
  public userId!: number;
}
