 import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel } from "./models/_index"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: [UserModel, UserPermissionsModel, LaundryModel, WashMachineModel, ScheduleModel ],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: [],
})
