import "reflect-metadata";

import { DataSource } from "typeorm";
import CustomError from "../errors/custom-error";
import { dataSource } from "./datasource";

export const createDBConnection = () => {
    const connect = (appDataSource: DataSource = dataSource) => {
        appDataSource
            .initialize()
            .then(async () => {
                console.log("Data Source has been initialized!");
                // await runSeed();
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
