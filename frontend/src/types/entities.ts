/* eslint-disable max-classes-per-file */

export class Task {
  public id!: number;

  public title!: string;

  public description!: string;

  public completed!: boolean;

  public completedAt!: Date | null;

  public createdAt!: Date;

  public updatedAt!: Date;
}

export class User {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public createdAt!: Date;

  public updatedAt!: Date;
}
