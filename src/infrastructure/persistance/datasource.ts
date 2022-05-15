import "reflect-metadata";
import "dotenv/config";

import { DataSource } from "typeorm";
import UserModel from "./user/user.model";
import path from "path";
import CollectionModel from "./collection/collection.model";
import PostModel from "./post/post.model";

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: [UserModel, CollectionModel, PostModel],
    subscribers: [],
    migrationsTableName: "custom_migration_table",
    migrations: [path.join(__dirname, "migration/*.ts")],
    migrationsRun: true,
});
