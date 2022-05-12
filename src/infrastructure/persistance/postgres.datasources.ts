import "reflect-metadata";

import { DataSource } from "typeorm";
import { dataSource } from "./datasource";
import CustomError from "../../core/errors/custom-error";

export const createDBConnection = () => {
    const connect = (appDataSource: DataSource = dataSource) => {
        appDataSource
            .initialize()
            .then(async () => {
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
