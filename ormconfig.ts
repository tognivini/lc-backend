import { ConnectionOptions } from 'typeorm'
import { UserModel, UserPermissionsModel } from './src/models/_index';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    UserModel, UserPermissionsModel
  ],
  synchronize: false,
  logging: ['warn', 'error'],
  migrations:  ["src/database/migrations/**/*.ts"],
}

export = connectionOptions