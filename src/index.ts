/* eslint-disable import/first */
require("dotenv").config();

import { createDBConnection } from "./infrastructure/persistance/postgres.datasources";
import { createServer } from "./interface/server/app";

const PORT = Number(process.env.PORT) || 3000;

createDBConnection().connect();

createServer(PORT).run();
