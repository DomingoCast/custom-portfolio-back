/* eslint-disable import/first */
import "dotenv/config";

import { createDBConnection } from "./infrastructure/persistance/postgres.datasources";
import { createServer } from "./interface/server/app";

export const startApplication = () => {
    const PORT = Number(process.env.PORT) || 3000;

    createDBConnection().connect();

    createServer(PORT).run();
};

startApplication();
