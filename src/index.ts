import { createDBConnection } from "./infrastructure/postgres.datasources";
import { createServer } from "./interface/server/app";

const PORT = Number(process.env.PORT) || 3000;

const { DataSource, connect } = createDBConnection();
connect();

createServer(PORT, DataSource).run();
