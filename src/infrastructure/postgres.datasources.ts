import "reflect-metadata";
import { DataSource } from "typeorm";
import UserModel from "./user/user.model";

export const createDBConnection = () => {
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

    const connect = () => {
        AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!");
            })
            .catch((error: any) => {
                console.error("Error during Data Source initialization", error);
            });
    };

    return {
        DataSource: AppDataSource,
        connect,
    };
};
