import { createServer } from "./interface/app";
import { createDBConnection } from "./infrastructure/postgres.datasources";

const PORT = Number(process.env.PORT) || 3000;

createServer(PORT).run();
createDBConnection().connect();
