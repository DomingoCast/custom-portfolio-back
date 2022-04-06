require("dotenv").config();

import { createDBConnection } from "./infrastructure/postgres.datasources";
import { createServer } from "./interface/server/app";

const PORT = Number(process.env.PORT) || 3000;

const { dataSource, connect } = createDBConnection();

connect();

createServer(PORT, dataSource).run();
