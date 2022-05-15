import { ConnectionOptions } from 'typeorm'

import { UserModel } from './src/models/UserModel';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    UserModel,
  ],
  synchronize: false,
  logging: ['warn', 'error'],
  migrations:  ["src/database/migrations/**/*.ts"],
}

export = connectionOptions