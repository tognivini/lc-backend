import { ConnectionOptions } from 'typeorm'

import { User } from './src/models/User';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    User,
  ],
  synchronize: false,
  logging: ['warn', 'error'],
  migrations:  ["src/database/migrations/**/*.ts"],
}

export = connectionOptions