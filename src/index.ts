require("dotenv").config();

import { setUpAwilix } from "./infrastructure/dependency-injection/awilix-set-up";
import { createDBConnection } from "./infrastructure/persistance/postgres.datasources";
import { createServer } from "./interface/server/app";

setUpAwilix();

const PORT = Number(process.env.PORT) || 3000;

const { dataSource, connect } = createDBConnection();

connect();

createServer(PORT, dataSource).run();
