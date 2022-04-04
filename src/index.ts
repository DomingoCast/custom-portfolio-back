import { createDBConnection } from "./infrastructure/postgres.datasources";
import { createServer } from "./interface/server/app";

const PORT = Number(process.env.PORT) || 3000;

createServer(PORT).run();
createDBConnection().connect();
