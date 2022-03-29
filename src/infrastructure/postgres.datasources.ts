import "reflect-metadata";
import { DataSource, TreeLevelColumn } from "typeorm";
import { Prueba } from "./prueba";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "prueba",
    password: "prueba",
    database: "prueba",
    entities: [Prueba],
    synchronize: true,
    logging: true,
});

module.exports = AppDataSource;
