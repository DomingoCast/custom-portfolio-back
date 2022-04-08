import { createDBConnection } from "./infrastructure/persistance/postgres.datasources";
import { createServer } from "./interface/server/app";

require("dotenv").config();

const awilix = require("awilix");

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});
container.register({});
// container.loadModules(["core/ports/*.repository.ts"], {
//     resolverOptions: {
//         lifetime: Lifetime.SINGLETON,
//     },
// });

const PORT = Number(process.env.PORT) || 3000;

const { dataSource, connect } = createDBConnection();

connect();

createServer(PORT, dataSource).run();
