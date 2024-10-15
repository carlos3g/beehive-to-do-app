import { PasswordChangeRequest } from '@app/modules/auth/entities/password-change-request.entity';
import { Task } from '@app/modules/task/entities/task.entity';
import { BaseEntity } from '@app/shared/abstracts/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column('varchar', { length: 255 })
  public name!: string;

  @Column('varchar', { length: 255 })
  public email!: string;

  @Column('varchar', { length: 255 })
  public password!: string;

  @OneToMany(() => Task, (task) => task.user)
  public tasks!: Task[];

  @OneToMany(() => PasswordChangeRequest, (passwordChangeRequest) => passwordChangeRequest.user)
  public passwordChangeRequests!: PasswordChangeRequest[];
}
