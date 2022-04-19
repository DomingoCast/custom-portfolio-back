/* eslint-disable import/first */
import "dotenv/config";

import { container } from "./infrastructure/dependency-injection/awilix-set-up";
import { createDBConnection } from "./infrastructure/persistance/postgres.datasources";
import { createServer } from "./interface/server/app";

import * as awilix from "awilix";

export const startApplication = () => {
    const PORT = Number(process.env.PORT) || 3000;

    const { dataSource, connect } = createDBConnection();

    container.register({
        dataSource: awilix.asValue(dataSource),
    });

    connect();

    createServer(PORT).run();
};

startApplication();
