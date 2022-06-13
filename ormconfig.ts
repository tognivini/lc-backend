import { ConnectionOptions } from 'typeorm'
import {UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel } from './src/models/_index';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [
    UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel 
  ],
  synchronize: false,
  logging: ['warn', 'error'],
  migrations:  ["src/database/migrations/**/*.ts"],
}

export = connectionOptions