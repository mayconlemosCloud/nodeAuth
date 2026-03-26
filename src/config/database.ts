import { DataSource } from 'typeorm';
import { UserEntity } from '../shared/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});
