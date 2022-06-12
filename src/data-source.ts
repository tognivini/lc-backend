 import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserModel, UserPermissionsModel, LaundryModel, WashMachineModel } from "./models/_index"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: [UserModel, UserPermissionsModel, LaundryModel, WashMachineModel ],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: [],
})
