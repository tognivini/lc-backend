import { ConnectionOptions } from 'typeorm'
import {UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel } from './src/models/_index';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  entities: [
    UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel 
  ],
  synchronize: false,
  logging: ['warn', 'error'],
  migrations:  ["src/database/migrations/**/*.ts"],
}

export = connectionOptions