import { EnvService } from '@app/shared/services/env.service';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: EnvService.DB_HOST,
  port: +EnvService.DB_PORT,
  username: EnvService.DB_USERNAME,
  password: EnvService.DB_PASSWORD,
  database: EnvService.DB_DATABASE,
  migrations: ['migrations/**'],
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: false,
});
