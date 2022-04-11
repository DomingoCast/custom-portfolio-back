require("dotenv").config();

import {
    setUpAwilix,
    container,
} from "./infrastructure/dependency-injection/awilix-set-up";
import { createDBConnection } from "./infrastructure/persistance/postgres.datasources";
import { createServer } from "./interface/server/app";

const awilix = require("awilix");

setUpAwilix();

const PORT = Number(process.env.PORT) || 3000;

const { dataSource, connect } = createDBConnection();

container.register({
    dataSource: awilix.asValue(dataSource),
});

connect();

createServer(PORT, dataSource).run();
