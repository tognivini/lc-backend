 import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel } from "./models/_index"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel ],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: [],
})
