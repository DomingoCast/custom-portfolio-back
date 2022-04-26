import "reflect-metadata";

import { DataSource } from "typeorm";
import CustomError from "../../interface/server/errors/custom-error";
import UserModel from "./user/user.model";

export let dataSource: DataSource;

export const createDBConnection = () => {
    dataSource = new DataSource({
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

    const connect = (appDataSource: DataSource = dataSource) => {
        appDataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!");
            })
            .catch((error: any) => {
                const errorMessage =
                    "Error during Data Source initialization " + error;
                throw new CustomError(errorMessage);
            });
    };

    return {
        connect,
    };
};
