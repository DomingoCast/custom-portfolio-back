import "reflect-metadata";
import { DataSource } from "typeorm";
import UserModel from "./user/user.model";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [UserModel],
    subscribers: [],
    migrations: [],
});

module.exports = AppDataSource;
