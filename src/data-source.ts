 import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserModel, UserPermissionsModel } from "./models/_index"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: [UserModel, UserPermissionsModel],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: [],
})
