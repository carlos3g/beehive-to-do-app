import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  public updatedAt!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  public createdAt!: Date;
}
